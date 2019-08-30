import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';
import {
  compose,
  fromPairs,
  get,
  keyBy,
  map,
  orderBy,
  propEq,
} from 'lodash/fp';
import { PipelineItem, Pipeline } from 'stores/models/pipeline';
import * as API from 'api/pipelines';
import { AxiosResponse } from 'axios';
import { OrderType, State, TPipeline, TPipelineItem, TState } from '../types';

export default types
  .model('PipelinesStore', {
    pipelines: types.map(PipelineItem),
    pipeline: types.maybeNull(Pipeline),
    state: State,
    pipelineState: State,
    sort: types.model('PipelinesSort', {
      field: 'status',
      order: types.enumeration('Order', ['asc', 'desc']),
    }),
    checked: types.map(types.safeReference(types.late(() => PipelineItem))),
  })
  .actions(self => {
    let initialState = {};
    const afterCreate = () => {
      initialState = getSnapshot(self);
    };
    const reset = () => {
      applySnapshot(self, initialState);
    };

    return {
      afterCreate,
      reset,
      load: flow(function* load() {
        self.state = 'loading';
        try {
          const res: AxiosResponse = yield API.getPipelines();

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
      fetchPipeline: flow(function* fetchPipeline(id: string, silent = false) {
        if (!silent) {
          self.pipelineState = 'loading';
        }
        try {
          const res: AxiosResponse<TPipeline> = yield API.getPipeline(id);

          self.pipeline = Pipeline.create(res.data);
          self.pipelineState = 'loaded';

          return res;
        } catch (e) {
          self.pipelineState = 'error';
          throw e;
        }
      }),
      createPipeline: flow(function* createPipeline(data) {
        const res: AxiosResponse<TPipeline> = yield API.addPipeline(data);

        self.pipelines.put(res.data);

        return res;
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
      changeSort(field: string, order = 'asc') {
        self.sort = { field, order };
      },
      checkPipeline(pipeline: TPipelineItem) {
        if (self.checked.has(pipeline.id)) {
          self.checked.delete(pipeline.id);
        } else {
          self.checked.put(pipeline);
        }
      },
      clearPipeline() {
        self.pipeline = null;
      },
      changePipelineState(state: TState) {
        self.pipelineState = state;
      },
    };
  })
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
  }));
