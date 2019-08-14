import Pipelines from './models/pipelines';

const PipelinesStore = Pipelines.create({
  state: 'pending',
  pipelineState: 'pending',
  pipeline: null,
  pipelines: {},
  sort: {
    field: 'status',
    order: 'asc',
  },
  checked: {},
});

export default PipelinesStore;
