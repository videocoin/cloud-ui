import { types, Instance } from 'mobx-state-tree';

export const State = types.enumeration('State', [
  'loading',
  'loaded',
  'pending',
  'error',
]);

export type TState = Instance<typeof State>;
