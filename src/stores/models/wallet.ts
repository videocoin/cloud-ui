import { types } from 'mobx-state-tree';

export const WalletSource = types.enumeration('WalletSource', [
  'UNDETECTED',
  'ETH',
  'VID',
]);

export const WalletType = types.enumeration('WalletType', [
  'UNKNOWN',
  'DEPOSIT',
  'STREAM_CREATED',
  'STREAM_ENDED',
  'INPUT_CHUNK_ADDED',
  'CHUNK_PROOF_SUBMITTED',
  'CHUNK_PROOF_VALIDATED',
  'CHUNK_PROOF_SCRAPPED',
  'ACCOUNT_FUNDED',
  'STREAM_REQUESTED',
  'STREAM_APPROVED',
  'VALIDATOR_ADDED',
  'VALIDATOR_REMOVED',
  'REFUND_ALLOWED',
  'REFUND_REVOKED',
]);

export const WalletAction = types.model('WalletAction', {
  source: WalletSource,
  hash: types.string,
  from: types.string,
  to: types.string,
  createdAt: types.Date,
  value: types.string,
  type: WalletType,
});
