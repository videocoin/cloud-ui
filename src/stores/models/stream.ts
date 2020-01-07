import { flow, Instance, types } from 'mobx-state-tree';
import * as API from 'api/streams';
import { Source } from 'stores/types';
import { AxiosResponse } from 'axios';
import { propEq } from 'lodash/fp';

const InputStatus = types.enumeration('InputStatus', [
  'INPUT_STATUS_NONE',
  'INPUT_STATUS_PENDING',
  'INPUT_STATUS_ACTIVE',
  'INPUT_STATUS_ERROR',
]);
const Status = types.enumeration('Status', [
  'STREAM_STATUS_NONE',
  'STREAM_STATUS_NEW',
  'STREAM_STATUS_PREPARING',
  'STREAM_STATUS_PREPARED',
  'STREAM_STATUS_PENDING',
  'STREAM_STATUS_PROCESSING',
  'STREAM_STATUS_READY',
  'STREAM_STATUS_COMPLETED',
  'STREAM_STATUS_CANCELLED',
  'STREAM_STATUS_FAILED',
]);

const StreamModel = types.model('Stream', {
  completedAt: types.maybeNull(types.string),
  createdAt: types.string,
  id: types.identifier,
  inputStatus: InputStatus,
  inputUrl: types.maybeNull(types.string),
  name: types.string,
  outputUrl: types.maybeNull(types.string),
  readyAt: types.maybeNull(types.string),
  status: Status,
  streamContractAddress: types.string,
  streamContractId: types.string,
  rtmpUrl: types.maybeNull(types.string),
  inputType: types.string,
});

export const Stream = StreamModel.actions(self => ({
  runStream: flow(function* runStream() {
    const res: AxiosResponse = yield API.runStream(self.id);

    self.status = res.data.status;

    return res;
  }),
  cancelStream: flow(function* cancelStream() {
    const res: AxiosResponse = yield API.cancelStream(self.id);

    self.status = res.data.status;

    return res;
  }),
  completeStream: flow(function* completeStream() {
    const res: AxiosResponse = yield API.completeStream(self.id);

    self.status = res.data.status;

    return res;
  }),
  updateStatus(status: IStatus) {
    self.status = status;
  },
})).views(self => ({
  get isWebRTC() {
    return propEq('inputType', 'INPUT_TYPE_WEBRTC')(self);
  },
}));

export const Protocol = types.model({
  source: Source,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.string,
  value: types.string,
  type: types.string,
});

export type IProtocol = Instance<typeof Protocol>;
export type IInputStatus = Instance<typeof InputStatus>;
export type IStatus = Instance<typeof Status>;
