import { flow, Instance, types } from 'mobx-state-tree';
import * as API from 'api/streams';
import { Source, Type } from 'stores/types';

const InputStatus = types.enumeration('InputStatus', [
  'INPUT_STATUS_NONE',
  'INPUT_STATUS_PENDING',
  'INPUT_STATUS_ACTIVE',
  'INPUT_STATUS_ERROR',
]);
const Status = types.enumeration('Status', [
  'JOB_STATUS_NONE',
  'JOB_STATUS_NEW',
  'JOB_STATUS_PREPARING',
  'JOB_STATUS_PREPARED',
  'JOB_STATUS_PENDING',
  'JOB_STATUS_PROCESSING',
  'JOB_STATUS_READY',
  'JOB_STATUS_COMPLETED',
  'JOB_STATUS_CANCELLED',
  'JOB_STATUS_FAILED',
]);

const StreamModel = types.model('Stream', {
  id: types.identifier,
  status: Status,
  inputStatus: InputStatus,
  pipelineId: types.string,
  streamAddress: types.string,
  streamId: types.string,
  transcodeOutputUrl: types.string,
  ingestInputUrl: types.string,
});

export const Stream = StreamModel.actions(self => ({
  runStream: flow(function* runStream() {
    const res = yield API.runStream(self.id);

    self.status = res.data.status;
  }),
  cancelStream: flow(function* cancelStream() {
    const res = yield API.cancelStream(self.id);

    self.status = res.data.status;
  }),
  completeStream: flow(function* completeStream() {
    const res = yield API.completeStream(self.id);

    self.status = res.data.status;
  }),
  updateStatus(status: IStatus) {
    self.status = status;
  },
}));

export const Protocol = types.model({
  source: Source,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.string,
  value: types.string,
  type: Type,
});

export type IProtocol = Instance<typeof Protocol>;
export type IInputStatus = Instance<typeof InputStatus>;
export type IStatus = Instance<typeof Status>;
