import React from 'react';
import Modal from 'components/Modal';
import { ActionBar, Button, Logo, Typography } from 'ui-kit';

interface WithdrawProps {
  closeModal: () => void;
}

const WithDraw = ({ closeModal }: WithdrawProps) => {
  const renderHeader = () => (
    <div className="g-tac">
      <Logo width={92} short type="colorWhite" />
    </div>
  );

  return (
    <Modal header={renderHeader}>
      <div className="modalInner">
        <Typography type="bodyAlt">
          Successfully Started Your Withdraw
        </Typography>
        <Typography type="smallBody">
          You&apos;ll receive an email shortly with the transaction id
          <br />
          once we&apos;ve begun the withdrawal.
        </Typography>
        <div className="modalActions">
          <ActionBar>
            <Button theme="minimal" onClick={closeModal}>
              Close
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default WithDraw;
