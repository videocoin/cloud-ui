import React, { lazy, LazyExoticComponent } from 'react';
import ModalStore from 'stores/modal';
import { observer } from 'mobx-react-lite';

export const modalType = {
  RESET_PASSWORD_AUTH: 'ResetPasswordAuth',
  RESET_PASSWORD: 'ResetPassword',
  RESTORE_PASSWORD: 'RestorePassword',
  WITHDRAW_CONFIRM: 'WithdrawModal',
  STREAMS_DELETE_CONFIRM: 'StreamsDeleteConfirm',
  SHARE_MODAL: 'ShareModal',
  DEPOSIT_MODAL: 'DepositModal',
  NEW_TOKEN_MODAL: 'NewTokenModal',
  ACCESS_TOKEN_MODAL: 'AccessTokenModal',
  REVOKE_TOKEN_MODAL: 'RevokeTokenModal',
};

const ResetPasswordAuth = lazy(() => import('components/ResetPasswordAuth'));
const ResetPassword = lazy(() => import('components/ResetPassword'));
const RestorePassword = lazy(() => import('components/RestorePassword'));
const WithdrawModal = lazy(() => import('components/WithdrawConfirmModal'));
const StreamsDeleteConfirm = lazy(() =>
  import('components/LiveStreams/DeleteConfirm'),
);
const ShareModal = lazy(() => import('components/ShareModal'));
const DepositModal = lazy(() => import('components/Wallet/DepositModal'));
const NewTokenModal = lazy(() => import('components/Account/NewTokenModal'));
const AccessTokenModal = lazy(() =>
  import('components/Account/AccessTokenModal'),
);
const RevokeTokenModal = lazy(() =>
  import('components/Account/RevokeTokenModal'),
);

const modalComponentLookupTable: { [key: string]: LazyExoticComponent<any> } = {
  ResetPasswordAuth,
  ResetPassword,
  RestorePassword,
  WithdrawModal,
  ShareModal,
  StreamsDeleteConfirm,
  DepositModal,
  NewTokenModal,
  AccessTokenModal,
  RevokeTokenModal,
};

const ModalManager = () => {
  const { type, props: modalProps, closeModal } = ModalStore;

  if (!type) return null;
  const ModalComponent = modalComponentLookupTable[type];

  return <ModalComponent closeModal={closeModal} {...modalProps} />;
};

export default observer(ModalManager);
