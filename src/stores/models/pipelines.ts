import { applySnapshot, flow, types } from 'mobx-state-tree';
import {
  compose,
  fromPairs,
  get,
  keyBy,
  map,
  orderBy,
  propEq,
  some,
} from 'lodash/fp';
import Pipeline from './pipeline';
import { OrderType, State, TPipeline } from '../types';
import * as API from '../../api/pipelines';

export default types
  .model('PipelinesStore', {
    pipelines: types.map(Pipeline),
    pipeline: types.maybeNull(types.reference(Pipeline)),
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
    fetchPipeline: flow(function* fetchPipeline(
      id: string,
      silent: boolean = false,
    ) {
      if (!silent) {
        self.pipelineState = 'loading';
      }
      try {
        const res = yield API.getPipeline(id);

        self.pipeline = res.data.id;
        self.pipelines.get(res.data.id).jobProfile = res.data.jobProfile;
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
    get isLoaded() {
      return propEq('state', 'loaded')(self);
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
