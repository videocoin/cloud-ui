import React, { useState } from 'react';
import Modal from 'components/Modal';
import UserStore from 'stores/user';
import { resetPassword } from 'api/user';
import plane from 'components/ResetPassword/assets/plane.svg';
import Form from './Form';
import Success from './Success';

interface ResetPasswordProps {
  closeModal: () => void;
  children?: never;
}

const ResetPassword = ({ closeModal }: ResetPasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const {
    user: { email },
    logout,
  } = UserStore;
  const renderHeader = () =>
    isSuccess ? (
      <img src={plane} alt="" />
    ) : (
      <img src="http://placehold.it/220x64" alt="" />
    );

  const handleReset = async () => {
    setIsLoading(true);
    await resetPassword({ email });
    setIsLoading(false);
    setSuccess(true);
  };

  const handleClose = () => {
    closeModal();
    logout();
  };

  return (
    <Modal header={renderHeader}>
      <div className="modalInner">
        {isSuccess ? (
          <Success closeModal={handleClose} />
        ) : (
          <Form
            email={email}
            closeModal={closeModal}
            handleReset={handleReset}
            isLoading={isLoading}
          />
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
