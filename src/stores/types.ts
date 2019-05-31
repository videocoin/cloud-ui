import { types, Instance } from 'mobx-state-tree';
import Pipeline from './models/pipeline';
import User from './models/user';
import Account from './models/account';
import PipelinesStore from './pipelines';

export const State = types.enumeration('State', [
  'loading',
  'loaded',
  'pending',
  'error',
  'deleting',
]);

export type TState = Instance<typeof State>;
export type TPipeline = Instance<typeof Pipeline>;
export type OrderType = 'asc' | 'desc';
export type TUser = Instance<typeof User>;
export type TAccount = Instance<typeof Account>;
export type TPipelineStore = Instance<typeof PipelinesStore>;
