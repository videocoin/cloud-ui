import React, { useState } from 'react';
import { Button } from 'videocoin-ui-kit';
import Modal from 'components/Modal';
import css from './index.module.scss';
import plane from './assets/plane.svg';
import Success from './Success';
import ResetForm from './Form';

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const onSuccess = (newEmail: string) => {
    setSuccess(true);
    setEmail(newEmail);
  };

  const renderHeader = () =>
    isSuccess ? (
      <div className={css.successHeader}>
        <img src={plane} alt="" />
      </div>
    ) : null;

  return (
    <div className={css.wrap}>
      <Button theme="ghost-primary" onClick={openModal}>
        Forgot password?
      </Button>
      <Modal
        header={renderHeader}
        close={closeModal}
        hideCloseButton
        isOpen={isOpen}
      >
        <div className={css.inner}>
          {isSuccess ? (
            <Success closeModal={closeModal} email={email} />
          ) : (
            <ResetForm onSuccess={onSuccess} closeModal={closeModal} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ResetPassword;
