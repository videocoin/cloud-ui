import { types } from 'mobx-state-tree';

export default types.model('JobProfile', {
  id: types.number,
  pipelineId: types.string,
  profileId: types.string,
  ingestInputUrl: types.string,
  transcodeOutputUrl: types.string,
  clientAddress: types.string,
  streamId: types.string,
  streamAddress: types.string,
  status: types.string,
  ingestStatus: types.string,
});
