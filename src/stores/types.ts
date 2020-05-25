import { types, Instance } from 'mobx-state-tree';
import StreamsStore from 'stores/streams';
import User from './models/user';
import { Stream } from './models/stream';
import { Profile } from './models/profile';

export const StateModel = types.enumeration('State', [
  'loading',
  'loaded',
  'pending',
  'error',
  'deleting',
  'creating',
]);

export const Source = types.enumeration('Source', ['UNDETECTED', 'ETH', 'VID']);

export const Type = types.enumeration('Type', [
  'UNKNOWN',
  'DEPOSIT',
  'STREAM_CREATED',
  'STREAM_REFUNDED',
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

export enum UIRole {
  MINER = 'USER_ROLE_UI_MINER',
  PUBLISHER = 'USER_ROLE_UI_PUBLISHER',
}

export type TStream = Instance<typeof Stream>;
export type TUser = Instance<typeof User>;
export type TStreamsStore = Instance<typeof StreamsStore>;
export type TProfile = Instance<typeof Profile>;
