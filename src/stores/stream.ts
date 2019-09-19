import { flow, types } from 'mobx-state-tree';
import { State } from 'stores/types';
import * as API from 'api/streams';
import { propEq } from 'lodash/fp';
import { Protocol, Stream } from 'stores/models/stream';
import { PROTOCOL_OFFSET } from 'const';
import { AxiosResponse } from 'axios';

const Store = types
  .model({
    stream: types.maybeNull(Stream),
    streamState: State,
    protocol: types.array(Protocol),
    protocolMeta: types.model({
      offset: types.number,
      page: types.number,
      limit: types.number,
      hasMore: false,
    }),
  })
  .actions(self => ({
    fetchStream: flow(function* fetchStream(id: string, silent = false) {
      if (!silent) {
        self.streamState = 'loading';
      }
      try {
        const res: AxiosResponse = yield API.getStream(id);

        self.stream = Stream.create(res.data);
        self.streamState = 'loaded';

        return res;
      } catch (e) {
        self.streamState = 'error';
        throw e;
      }
    }),
    clearStream() {
      self.stream = null;
      self.protocol.clear();
    },
    fetchProtocol: flow(function* fetchProtocol(id: string, page: number) {
      const offset = (page - 1) * PROTOCOL_OFFSET;

      self.protocolMeta.offset = offset;
      self.protocolMeta.page = page;
      const res: AxiosResponse = yield API.getProtocol(id, {
        offset,
        limit: PROTOCOL_OFFSET,
      });

      self.protocolMeta.hasMore = res.data.actions.length === PROTOCOL_OFFSET;

      self.protocol.replace(res.data.actions);
    }),
  }))
  .views(self => ({
    get isStreamLoading() {
      return propEq('state', 'loading')(self);
    },
    get isStreamPending() {
      return propEq('streamState', 'pending')(self);
    },
  }));

const StreamStore = Store.create({
  streamState: 'pending',
  stream: null,
  protocolMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: 1,
  },
});

export default StreamStore;
