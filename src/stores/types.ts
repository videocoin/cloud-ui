import { types, Instance } from 'mobx-state-tree';
import { Pipeline, PipelineItem } from 'stores/models/pipeline';
import User from './models/user';
import Account from './models/account';
import PipelinesStore from './pipelines';
import JobProfile from './models/jobProfile';
import Stream from './models/stream';

export const State = types.enumeration('State', [
  'loading',
  'loaded',
  'pending',
  'error',
  'deleting',
]);

export type TState = Instance<typeof State>;
export type TPipeline = Instance<typeof Pipeline>;
export type TPipelineItem = Instance<typeof PipelineItem>;
export type TStream = Instance<typeof Stream>;
export type OrderType = 'asc' | 'desc';
export type TUser = Instance<typeof User>;
export type TAccount = Instance<typeof Account>;
export type TPipelineStore = Instance<typeof PipelinesStore>;
export type JobProfile = Instance<typeof JobProfile>;
