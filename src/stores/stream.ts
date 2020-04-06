import { flow, types } from 'mobx-state-tree';
import { StateModel } from 'stores/types';
import * as API from 'api/streams';
import { map, propEq } from 'lodash/fp';
import { IProtocol, Protocol, Stream } from 'stores/models/stream';
import { PROTOCOL_OFFSET, START_PAGE, STATE } from 'const';
import { AxiosResponse } from 'axios';
import { convertToVID } from 'helpers/convertBalance';

const Store = types
  .model({
    stream: types.maybeNull(Stream),
    streamState: StateModel,
    protocol: types.array(Protocol),
    protocolMeta: types.model({
      offset: types.number,
      page: types.number,
      limit: types.number,
      hasMore: false,
    }),
  })
  .actions((self) => ({
    fetchStream: flow(function* fetchStream(id: string, silent = false) {
      if (!silent) {
        self.streamState = STATE.loading;
      }
      try {
        const res: AxiosResponse = yield API.getStream(id);

        self.stream = Stream.create(res.data);
        self.streamState = STATE.loaded;

        return res;
      } catch (e) {
        self.streamState = STATE.error;
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
      const mappedActions = map<IProtocol, IProtocol>(({ value, ...rest }) => ({
        value: convertToVID(value),
        ...rest,
      }))(res.data.actions);

      self.protocol.replace(mappedActions);
    }),
  }))
  .views((self) => ({
    get isStreamLoading() {
      return propEq('state', STATE.loading)(self);
    },
    get isStreamPending() {
      return propEq('streamState', STATE.pending)(self);
    },
  }));

const StreamStore = Store.create({
  streamState: STATE.pending,
  stream: null,
  protocolMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: START_PAGE,
  },
});

export default StreamStore;
