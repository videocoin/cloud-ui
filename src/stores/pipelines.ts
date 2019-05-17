import { types, flow, applySnapshot } from 'mobx-state-tree';
import { propEq, keyBy, fromPairs, orderBy, compose } from 'lodash/fp';
import makeInspectable from 'mobx-devtools-mst';
import { getPipeline, getPipelines } from 'api/pipelines';
import { State } from './types';

type OrderType = 'asc' | 'desc';

const Pipeline = types.model('Pipeline', {
  id: types.identifier,
  name: types.string,
  status: types.enumeration('Status', ['IDLE']),
  profileId: types.string,
});

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
    checked: types.array(types.string),
  })
  .actions(self => ({
    afterCreate() {
      this.load();
    },
    load: flow(function* load() {
      self.state = 'loading';
      try {
        const res = yield getPipelines();
        applySnapshot(self.pipelines, keyBy('id', res.data.items));
        self.state = 'loaded';
        return res;
      } catch (e) {
        self.state = 'error';
        throw e;
      }
    }),
    fetchPipeline: flow(function* fetchPipeline(id: string) {
      const res = yield getPipeline(id);
      self.pipeline = res.data;
    }),
    changeSort(field: string, order: string = 'asc') {
      self.sort = { field, order };
    },
    checkPipeline(id: string) {
      const idx = self.checked.indexOf(id);
      if (idx >= 0) {
        self.checked.remove(id);
      } else {
        self.checked.push(id);
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
  checked: [],
});

makeInspectable(PipelinesStore);

export default PipelinesStore;
