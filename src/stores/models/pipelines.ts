import { applySnapshot, flow, types } from 'mobx-state-tree';
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
import Stream from 'stores/models/stream';
import { getStream } from 'api/streams';
import * as API from 'api/pipelines';
import { OrderType, State, TPipelineItem, TState } from '../types';

export default types
  .model('PipelinesStore', {
    pipelines: types.map(PipelineItem),
    pipeline: types.maybeNull(Pipeline),
    stream: types.maybeNull(Stream),
    state: State,
    pipelineState: State,
    streamState: State,
    sort: types.model('PipelinesSort', {
      field: 'status',
      order: types.enumeration('Order', ['asc', 'desc']),
    }),
    checked: types.map(types.safeReference(types.late(() => PipelineItem))),
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

        self.pipeline = Pipeline.create(res.data);
        self.pipelineState = 'loaded';

        return res;
      } catch (e) {
        self.pipelineState = 'error';
        throw e;
      }
    }),
    fetchStream: flow(function* fetchStream(
      id: string,
      silent: boolean = false,
    ) {
      if (!silent) {
        self.streamState = 'loading';
      }
      try {
        const res = yield getStream(id);

        self.stream = Stream.create(res.data);
        self.streamState = 'loaded';

        return res;
      } catch (e) {
        self.streamState = 'error';
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
    clearStream() {
      self.stream = null;
    },
    changePipelineState(state: TState) {
      self.pipelineState = state;
    },
  }))
  .views(self => ({
    get isLoading() {
      return propEq('state', 'loading')(self);
    },
    get isPending() {
      return propEq('state', 'pending')(self);
    },
    get isStreamLoading() {
      return propEq('state', 'loading')(self);
    },
    get isStreamPending() {
      return propEq('streamState', 'pending')(self);
    },
    get isStreamsDeleting() {
      return propEq('pipelineState', 'deleting')(self);
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
