import React, { lazy, LazyExoticComponent } from 'react';
import ModalStore from 'stores/modal';
import { observer } from 'mobx-react-lite';

export const modalType = {
  RESET_PASSWORD_AUTH: 'ResetPasswordAuth',
  RESET_PASSWORD: 'ResetPassword',
  RESTORE_PASSWORD: 'RestorePassword',
  WITHDRAW_SUCCESS_MODAL: 'WithdrawSuccessModal',
  STREAMS_DELETE_CONFIRM: 'StreamsDeleteConfirm',
  SHARE_MODAL: 'ShareModal',
  DEPOSIT_MODAL: 'DepositModal',
  NEW_TOKEN_MODAL: 'NewTokenModal',
  ACCESS_TOKEN_MODAL: 'AccessTokenModal',
  REVOKE_TOKEN_MODAL: 'RevokeTokenModal',
  CONFIRM_WITHDRAW_MODAL: 'ConfirmWithdrawModal',
  REVEAL_WORKER_MODAL: 'RevealWorkerModal',
  CONFIRM_MODAL: 'ConfirmModal',
  ADD_FUNDS: 'AddFunds',
};

const ResetPasswordAuth = lazy(() => import('components/ResetPasswordAuth'));
const ResetPassword = lazy(() => import('components/ResetPassword'));
const RestorePassword = lazy(() => import('components/RestorePassword'));
const WithdrawSuccessModal = lazy(() =>
  import('components/WithdrawSuccessModal'),
);
const StreamsDeleteConfirm = lazy(() =>
  import('components/Streams/DeleteConfirm'),
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
const ConfirmWithdrawModal = lazy(() =>
  import('components/Wallet/ConfirmModal'),
);
const RevealWorkerModal = lazy(() =>
  import('components/Workers/RevealWorkerModal'),
);
const ConfirmModal = lazy(() => import('components/ConfirmModal'));
const AddFunds = lazy(() => import('components/Billing/AddFundsModal'));

const modalComponentLookupTable: { [key: string]: LazyExoticComponent<any> } = {
  ResetPasswordAuth,
  ResetPassword,
  RestorePassword,
  WithdrawSuccessModal,
  ShareModal,
  StreamsDeleteConfirm,
  DepositModal,
  NewTokenModal,
  AccessTokenModal,
  RevokeTokenModal,
  ConfirmWithdrawModal,
  RevealWorkerModal,
  ConfirmModal,
  AddFunds,
};

const ModalManager = () => {
  const { type, props: modalProps, closeModal } = ModalStore;

  if (!type) return null;
  const ModalComponent = modalComponentLookupTable[type];

  return <ModalComponent closeModal={closeModal} {...modalProps} />;
};

export default observer(ModalManager);
