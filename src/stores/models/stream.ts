import { flow, types } from 'mobx-state-tree';
import * as API from 'api/streams';

export default types
  .model('Stream', {
    id: types.identifier,
    status: types.enumeration('Status', [
      'JOB_STATUS_NONE',
      'JOB_STATUS_NEW',
      'JOB_STATUS_PENDING',
      'JOB_STATUS_PROCESSING',
      'JOB_STATUS_READY',
      'JOB_STATUS_COMPLETED',
      'JOB_STATUS_CANCELLED',
      'JOB_STATUS_FAILED',
    ]),
    inputStatus: types.enumeration('InputStatus', [
      'INPUT_STATUS_NONE',
      'INPUT_STATUS_PENDING',
      'INPUT_STATUS_ACTIVE',
      'INPUT_STATUS_ERROR',
    ]),
    pipelineId: types.string,
    streamAddress: types.string,
    streamId: types.string,
    transcodeOutputUrl: types.string,
    ingestInputUrl: types.string,
  })
  .actions(self => ({
    runStream: flow(function* runStream() {
      try {
        const res = yield API.runStream(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    cancelStream: flow(function* cancelStream() {
      try {
        const res = yield API.cancelStream(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    completeStream: flow(function* completeStream() {
      try {
        const res = yield API.completeStream(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    updateStatus(status: string) {
      self.status = status;
    },
    updateLog(message: string) {
      // self.protocol.push(message);
    },
  }));
