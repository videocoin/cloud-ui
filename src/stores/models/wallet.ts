import { Instance, types } from 'mobx-state-tree';

export const WalletAction = types.model('WalletAction', {
  source: types.string,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.string,
  value: types.string,
  type: types.string,
});

export type IWalletAction = Instance<typeof WalletAction>;
