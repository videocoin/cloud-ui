import { types, flow, applySnapshot, Instance } from 'mobx-state-tree';
import {
  map,
  propEq,
  keyBy,
  fromPairs,
  orderBy,
  compose,
  get,
  some,
} from 'lodash/fp';
import * as API from 'api/pipelines';
import Centrifuge from 'centrifuge';
import { State } from './types';

type OrderType = 'asc' | 'desc';

const JobProfile = types.model('JobProfile', {
  id: types.number,
  pipelineId: types.string,
  profileId: types.string,
  ingestInputUrl: types.string,
  transcodeOutputUrl: types.string,
  clientAddress: types.string,
  streamId: types.string,
  streamAddress: types.string,
  status: types.string,
  ingestStatus: types.string,
});

const Pipeline = types.model('Pipeline', {
  id: types.identifier,
  name: types.string,
  jobProfile: types.maybeNull(JobProfile),
  status: types.enumeration('Status', [
    'IDLE',
    'PENDING_CREATE',
    'PENDING_JOB',
  ]),
  profileId: types.string,
});

export type TPipeline = Instance<typeof Pipeline>;

const Store = types
  .model('PipelinesStore', {
    pipelines: types.map(Pipeline),
    pipeline: types.maybeNull(Pipeline),
    state: State,
    pipelineState: State,
    sort: types.model('PipelinesSort', {
      field: 'status',
      order: types.enumeration('Order', ['asc', 'desc']),
    }),
    checked: types.map(types.safeReference(types.late(() => Pipeline))),
  })
  .actions(self => ({
    load: flow(function* load() {
      self.state = 'loading';
      try {
        const res = yield API.getPipelines();

        const mappedData = compose(
          keyBy('id'),
          get('data.items'),
        )(res);

        applySnapshot(self.pipelines, mappedData);
        self.state = 'loaded';

        return res;
      } catch (e) {
        self.state = 'error';
        throw e;
      }
    }),
    fetchPipeline: flow(function* fetchPipeline(id: string) {
      self.pipelineState = 'loading';
      try {
        const res = yield API.getPipeline(id);

        self.pipeline = res.data;
        self.pipelineState = 'loaded';

        return res;
      } catch (e) {
        self.pipelineState = 'error';
        throw e;
      }
    }),
    createPipeline: flow(function* createPipeline(data) {
      try {
        const res = yield API.addPipeline(data);

        self.pipelines.put(res.data);

        return res;
      } catch (e) {
        throw e;
      }
    }),
    deletePipelines: flow(function* deletePipelines() {
      self.state = 'deleting';
      const keys = [...self.checked.keys()];
      const promises = map(API.deletePipeline)(keys);

      try {
        const res = yield Promise.all(promises);

        self.checked.forEach((val, key) => self.pipelines.delete(key));
        self.state = 'loaded';

        return res;
      } catch (e) {
        self.state = 'error';
        throw e;
      }
    }),
    changeSort(field: string, order: string = 'asc') {
      self.sort = { field, order };
    },
    checkPipeline(pipeline: TPipeline) {
      if (self.checked.has(pipeline.id)) {
        self.checked.delete(pipeline.id);
      } else {
        self.checked.put(pipeline);
      }
    },
    clearPipeline() {
      self.pipeline = null;
    },
    initSocket(id: string) {
      const token = localStorage.getItem('token');
      const centrifuge = new Centrifuge(
        `wss://ws.thor.videocoin.network/connection/websocket`,
      );

      centrifuge.setToken(token);
      centrifuge.subscribe(`users#${id}`, (message: string) => {
        console.log(message);
      });
      centrifuge.connect();
    },
  }))
  .views(self => ({
    get isLoading() {
      return propEq('state', 'loading')(self);
    },
    get isPending() {
      return propEq('state', 'pending')(self);
    },
    get isDeleting() {
      return propEq('state', 'deleting')(self);
    },
    get items() {
      return compose(
        orderBy(self.sort.field, self.sort.order as OrderType),
        fromPairs,
      )([...self.pipelines]);
    },
    get hasFirstActiveStream() {
      return some(!propEq('status', 'IDLE'))(self.pipelines);
    },
  }));

const PipelinesStore = Store.create({
  state: 'pending',
  pipelineState: 'pending',
  pipeline: null,
  pipelines: {},
  sort: {
    field: 'status',
    order: 'asc',
  },
  checked: {},
});

export type TPipelineStore = Instance<typeof PipelinesStore>;

export default PipelinesStore;
