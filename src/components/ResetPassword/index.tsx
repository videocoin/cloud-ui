import React, { useState } from 'react';
import Modal from 'components/Modal';
import css from './index.module.scss';
import plane from './assets/plane.svg';
import Success from './Success';
import ResetForm from './Form';

const ResetPassword = ({ closeModal }: { closeModal: () => void }) => {
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

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
    <Modal header={renderHeader}>
      <div className="modalInner">
        {isSuccess ? (
          <Success closeModal={closeModal} email={email} />
        ) : (
          <ResetForm onSuccess={onSuccess} closeModal={closeModal} />
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
