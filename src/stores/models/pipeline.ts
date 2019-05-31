import { flow, types } from 'mobx-state-tree';
import JobProfile from './jobProfile';
import * as API from '../../api/pipelines';

export default types
  .model('Pipeline', {
    id: types.identifier,
    name: types.string,
    jobProfile: types.maybeNull(JobProfile),
    status: types.enumeration('Status', [
      'IDLE',
      'PENDING_REQUEST',
      'PENDING_APPROVE',
      'PENDING_CREATE',
      'PENDING_JOB',
      'RUNNING',
      'FAILED',
      'COMPLETED',
    ]),
    profileId: types.string,
  })
  .actions(self => ({
    runPipeline: flow(function* runPipeline() {
      try {
        const res = yield API.runPipeline(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    cancelPipeline: flow(function* cancelPipeline() {
      try {
        const res = yield API.cancelPipeline(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    completePipeline: flow(function* completePipeline() {
      try {
        const res = yield API.completePipeline(self.id);

        self.status = res.data.status;
      } catch (e) {
        throw e;
      }
    }),
    updateStatus(status: string) {
      self.status = status;
    },
  }));
