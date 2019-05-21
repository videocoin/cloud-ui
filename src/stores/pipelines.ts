import { types, flow, applySnapshot, Instance } from 'mobx-state-tree';
import { propEq, keyBy, fromPairs, orderBy, compose, get } from 'lodash/fp';
import makeInspectable from 'mobx-devtools-mst';
import { addPipeline, getPipeline, getPipelines } from 'api/pipelines';
import { State } from './types';

type OrderType = 'asc' | 'desc';

const Pipeline = types.model('Pipeline', {
  id: types.identifier,
  name: types.string,
  status: types.enumeration('Status', ['IDLE']),
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
    checked: types.map(types.reference(types.late(() => Pipeline))),
  })
  .actions(self => ({
    load: flow(function* load() {
      self.state = 'loading';
      try {
        const res = yield getPipelines();

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
      try {
        const res = yield getPipeline(id);

        self.pipeline = res.data;

        return res;
      } catch (e) {
        throw e;
      }
    }),
    createPipeline: flow(function* createPipeline(data) {
      try {
        const res = yield addPipeline(data);

        self.pipelines.put(res.data);

        return res;
      } catch (e) {
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
  }))
  .views(self => ({
    get isLoading() {
      return propEq('state', 'loading')(self);
    },
    get isPending() {
      return propEq('state', 'pending')(self);
    },
    get items() {
      return compose(
        orderBy(self.sort.field, self.sort.order as OrderType),
        fromPairs,
      )([...self.pipelines]);
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

makeInspectable(PipelinesStore);

export default PipelinesStore;
