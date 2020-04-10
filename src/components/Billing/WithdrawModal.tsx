import React from 'react';
import Modal from 'components/Modal';
import { Typography, ActionBar, Button } from 'ui-kit';
import modalStore from 'stores/modal';

const WithdrawModal = () => {
  const { closeModal } = modalStore;
  return (
    <Modal>
      <div className="modalInner">
        <Typography type="body">Please Email Us To Withdraw</Typography>
        <Typography type="smallBodyThin">
          Email support@videocoin.io to initiate a withdraw. Please provide your
          email address used on the account and the amount you would like
          refunded.
        </Typography>
        <div className="modalActions">
          <ActionBar>
            <Button theme="sunkissed" onClick={closeModal}>
              Close
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
