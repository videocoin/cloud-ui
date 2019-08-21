import { Instance, types } from 'mobx-state-tree';
import { Source, Type } from 'stores/types';

export const WalletAction = types.model('WalletAction', {
  source: Source,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.string,
  value: types.string,
  type: Type,
});

export type IWalletAction = Instance<typeof WalletAction>;
