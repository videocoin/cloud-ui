import { flow, Instance, types } from 'mobx-state-tree';
import * as API from 'api/streams';
import { Source } from 'stores/types';
import { AxiosResponse } from 'axios';
import { propEq } from 'lodash/fp';
import { STREAM_STATUS, INPUT_STATUS, STREAM_INPUT_TYPE } from 'const';

const InputStatus = types.enumeration('InputStatus', [
  'INPUT_STATUS_NONE',
  'INPUT_STATUS_PENDING',
  'INPUT_STATUS_ACTIVE',
  'INPUT_STATUS_ERROR',
  'INPUT_STATUS_CANCELLED',
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
  'STREAM_STATUS_DELETED',
]);

const StreamModel = types.model('Stream', {
  completedAt: types.maybeNull(types.string),
  createdAt: types.string,
  id: types.identifier,
  inputStatus: InputStatus,
  name: types.string,
  outputUrl: types.maybeNull(types.string),
  readyAt: types.maybeNull(types.string),
  status: Status,
  streamContractAddress: types.string,
  streamContractId: types.string,
  rtmpUrl: types.maybeNull(types.string),
  inputType: types.string,
  totalCost: types.number,
});

export const Stream = StreamModel.actions((self) => ({
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
})).views((self) => ({
  get isWebRTC() {
    return propEq('inputType', STREAM_INPUT_TYPE.WEBRTC)(self);
  },
  get isProcessing() {
    return propEq('status', STREAM_STATUS.PROCESSING)(self);
  },
  get isPending() {
    return propEq('status', STREAM_STATUS.PENDING)(self);
  },
  get isPreparing() {
    return propEq('status', STREAM_STATUS.PREPARING)(self);
  },
  get isFailed() {
    return propEq('status', STREAM_STATUS.FAILED)(self);
  },
  get isOffline() {
    return propEq('status', STREAM_STATUS.NEW)(self);
  },
  get isReady() {
    return propEq('status', STREAM_STATUS.READY)(self);
  },
  get isPrepared() {
    return propEq('status', STREAM_STATUS.PREPARED)(self);
  },
  get isCompleted() {
    return propEq('status', STREAM_STATUS.COMPLETED)(self);
  },
  get isInputActive() {
    return propEq('inputStatus', INPUT_STATUS.ACTIVE)(self);
  },
  get isInputPending() {
    return propEq('inputStatus', INPUT_STATUS.PENDING)(self);
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
