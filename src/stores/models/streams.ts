import {
  applySnapshot,
  destroy,
  flow,
  getSnapshot,
  types,
} from 'mobx-state-tree';
import {
  compose,
  fromPairs,
  get,
  keyBy,
  map,
  orderBy,
  propEq,
} from 'lodash/fp';
import * as API from 'api/streams';
import { AxiosResponse } from 'axios';
import { Stream } from 'stores/models/stream';
import { OrderType, State, TStream } from '../types';

export default types
  .model('StreamsStore', {
    streams: types.map(Stream),
    state: State,
    sort: types.model('StreamsSort', {
      field: 'status',
      order: types.enumeration('Order', ['asc', 'desc']),
    }),
    checked: types.map(types.safeReference(types.late(() => Stream))),
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
          const res: AxiosResponse = yield API.getStreams();

          const mappedData = compose(
            keyBy('id'),
            get('data.items'),
          )(res);

          applySnapshot(self.streams, mappedData);
          self.state = 'loaded';

          return res;
        } catch (e) {
          self.state = 'error';
          throw e;
        }
      }),
      createStream: flow(function* createStream(data) {
        const res: AxiosResponse<TStream> = yield API.addStream(data);

        self.streams.put(res.data);

        return res;
      }),
      deleteStreams: flow(function* deleteStreams() {
        self.state = 'deleting';
        const keys = [...self.checked.keys()];
        const promises = map(API.deleteStream)(keys);

        try {
          const res = yield Promise.all(promises);

          self.checked.forEach(i => destroy(i));
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
      checkStream(stream: TStream) {
        if (self.checked.has(stream.id)) {
          self.checked.delete(stream.id);
        } else {
          self.checked.put(stream);
        }
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
      )([...self.streams]);
    },
  }));
