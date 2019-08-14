import { applySnapshot, flow, types } from 'mobx-state-tree';
import { State } from 'stores/types';
import * as API from 'api/streams';
import { propEq } from 'lodash/fp';
import { Protocol, Stream } from 'stores/models/stream';

const Store = types
  .model({
    stream: types.maybeNull(Stream),
    streamState: State,
    protocol: types.array(Protocol),
  })
  .actions(self => ({
    fetchStream: flow(function* fetchStream(id: string, silent = false) {
      if (!silent) {
        self.streamState = 'loading';
      }
      try {
        const res = yield API.getStream(id);

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
    fetchProtocol: flow(function* fetchProtocol(id: string) {
      const res = yield API.getProtocol(id);

      applySnapshot(self.protocol, res.data.actions);
    }),
  }))
  .views(self => ({
    get isStreamLoading() {
      return propEq('state', 'loading')(self);
    },
    get isStreamPending() {
      return propEq('streamState', 'pending')(self);
    },
    get isStreamDeleting() {
      return propEq('pipelineState', 'deleting')(self);
    },
  }));

const StreamStore = Store.create({
  streamState: 'pending',
  stream: null,
});

export default StreamStore;
