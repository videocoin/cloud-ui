import { types } from 'mobx-state-tree';

// eslint-disable-next-line
export const State = types.enumeration('State', [
  'loading',
  'loaded',
  'pending',
  'error',
]);
