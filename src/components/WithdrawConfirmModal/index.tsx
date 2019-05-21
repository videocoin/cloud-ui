import React from 'react';
import Modal from 'components/Modal';
import { ActionBar, Button, Logo, Typography } from 'ui-kit/src';

interface WithdrawProps {
  amount: string;
  address: string;
  closeModal: () => void;
}

const WithDraw = ({ amount, address, closeModal }: WithdrawProps) => {
  const renderHeader = () => (
    <div className="g-tac">
      <Logo width={92} short type="colorWhite" />
    </div>
  );

  return (
    <Modal header={renderHeader}>
      <div className="modalInner">
        <Typography type="bodyAlt">Withdraw {amount} VID to</Typography>
        <Typography type="smallBody">{address}</Typography>
        <div className="modalActions">
          <ActionBar>
            <Button theme="minimal" onClick={closeModal}>
              Cancel
            </Button>
            <Button>Withdraw</Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default WithDraw;
