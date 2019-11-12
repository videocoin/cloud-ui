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

export const WalletTransaction = types.model('WalletTransaction', {
  hash: types.string,
  from: types.string,
  to: types.string,
  timestamp: types.string,
  value: types.string,
});

export const WalletMeta = types.model({
  offset: types.number,
  page: types.number,
  limit: types.number,
  hasMore: false,
});

export type IWalletAction = Instance<typeof WalletAction>;
export type IWalletTransaction = Instance<typeof WalletTransaction>;
