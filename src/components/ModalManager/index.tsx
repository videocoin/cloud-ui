import React, { lazy, LazyExoticComponent } from 'react';
import ModalStore from 'stores/modal';
import { fromPairs } from 'lodash/fp';
import { observer } from 'mobx-react-lite';

export const modalType = {
  RESET_PASSWORD_AUTH: 'ResetPasswordAuth',
  RESET_PASSWORD: 'ResetPassword',
  RESTORE_PASSWORD: 'RestorePassword',
  WITHDRAW_CONFIRM: 'WithdrawModal',
};

const ResetPasswordAuth = lazy(() => import('components/ResetPasswordAuth'));
const ResetPassword = lazy(() => import('components/ResetPassword'));
const RestorePassword = lazy(() => import('components/RestorePassword'));
const WithdrawModal = lazy(() => import('components/WithdrawConfirmModal'));

const modalComponentLookupTable: { [key: string]: LazyExoticComponent<any> } = {
  ResetPasswordAuth,
  ResetPassword,
  RestorePassword,
  WithdrawModal,
};

const ModalManager = () => {
  const { type, props: modalProps, closeModal } = ModalStore;
  const ModalComponent = modalComponentLookupTable[type];
  if (!type) return null;
  const pairsProps = modalProps ? fromPairs([...modalProps]) : {};
  return <ModalComponent closeModal={closeModal} {...pairsProps} />;
};

export default observer(ModalManager);
