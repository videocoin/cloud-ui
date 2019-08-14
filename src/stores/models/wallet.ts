import { types } from 'mobx-state-tree';
import { Source, Type } from 'stores/types';

export const WalletAction = types.model('WalletAction', {
  source: Source,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.Date,
  value: types.string,
  type: Type,
});
