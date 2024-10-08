import {
  applySnapshot,
  destroy,
  flow,
  getSnapshot,
  types,
} from 'mobx-state-tree';
import { map, propEq } from 'lodash/fp';
import * as API from 'api/streams';
import { AxiosResponse } from 'axios';
import { Stream } from 'stores/models/stream';
import { Profile } from 'stores/models/profile';
import { values } from 'mobx';
import { ORDER, STATE } from 'const';
import { StateModel, TStream } from '../types';

export default types
  .model('StreamsStore', {
    streams: types.array(Stream),
    state: StateModel,
    sort: types.model('StreamsSort', {
      field: 'status',
      order: types.enumeration('Order', [ORDER.ASC, ORDER.DESC]),
    }),
    checked: types.map(types.safeReference(types.late(() => Stream))),
    profiles: types.array(Profile),
  })
  .actions((self) => {
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
        self.state = STATE.loading;
        try {
          const res: AxiosResponse = yield API.getStreams();

          self.streams = res.data.items;

          self.state = STATE.loaded;

          return res;
        } catch (e) {
          self.state = STATE.error;
          throw e;
        }
      }),
      createStream: flow(function* createStream(data) {
        const res: AxiosResponse<TStream> = yield API.addStream(data);

        self.streams.unshift(res.data);

        return res;
      }),
      deleteStreams: flow(function* deleteStreams() {
        self.state = STATE.deleting;
        const keys = [...self.checked.keys()];
        const promises = map(API.deleteStream)(keys);

        try {
          const res = yield Promise.all(promises);

          self.checked.forEach((i) => destroy(i));
          self.state = STATE.loaded;

          return res;
        } catch (e) {
          self.state = STATE.error;
          throw e;
        }
      }),
      changeSort(field: string, order: ORDER = ORDER.ASC) {
        self.sort = { field, order };
      },
      checkStream(stream: TStream) {
        if (self.checked.has(stream.id)) {
          self.checked.delete(stream.id);
        } else {
          self.checked.put(stream);
        }
      },
      fetchProfiles: flow(function* fetchProfiles() {
        const res: AxiosResponse = yield API.getProfiles();

        applySnapshot(self.profiles, res.data.items);

        return res;
      }),
    };
  })
  .views((self) => ({
    get isLoading() {
      return propEq('state', STATE.loading)(self);
    },
    get isPending() {
      return propEq('state', STATE.pending)(self);
    },
    get isDeleting() {
      return propEq('state', STATE.deleting)(self);
    },
    get isLoaded() {
      return propEq('state', STATE.loaded)(self);
    },
    get items() {
      return values(self.streams);
    },
    get profilesSelect() {
      return map(({ id: value, name, description }) => ({
        label: `${name} (${description})`,
        value,
      }))(self.profiles);
    },
  }));
