import React, { lazy, LazyExoticComponent } from 'react';
import ModalStore from 'stores/modal';
import { fromPairs } from 'lodash/fp';
import { observer } from 'mobx-react-lite';

export const modalType = {
  RESET_PASSWORD_AUTH: 'ResetPasswordAuth',
  RESET_PASSWORD: 'ResetPassword',
  RESTORE_PASSWORD: 'RestorePassword',
  WITHDRAW_CONFIRM: 'WithdrawModal',
  PIPELINES_DELETE_CONFIRM: 'PipelinesDeleteConfirm',
};

const ResetPasswordAuth = lazy(() => import('components/ResetPasswordAuth'));
const ResetPassword = lazy(() => import('components/ResetPassword'));
const RestorePassword = lazy(() => import('components/RestorePassword'));
const WithdrawModal = lazy(() => import('components/WithdrawConfirmModal'));
const PipelinesDeleteConfirm = lazy(() =>
  import('components/Pipelines/DeleteConfirm'),
);

const modalComponentLookupTable: { [key: string]: LazyExoticComponent<any> } = {
  ResetPasswordAuth,
  ResetPassword,
  RestorePassword,
  WithdrawModal,
  PipelinesDeleteConfirm,
};

const ModalManager = () => {
  const { type, props: modalProps, closeModal } = ModalStore;

  if (!type) return null;
  const ModalComponent = modalComponentLookupTable[type];

  const pairsProps = modalProps ? fromPairs([...modalProps]) : {};

  return <ModalComponent closeModal={closeModal} {...pairsProps} />;
};

export default observer(ModalManager);
