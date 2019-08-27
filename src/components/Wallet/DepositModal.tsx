import React from 'react';
import { Button, Logo, Typography } from 'ui-kit/src';
import Modal from 'components/Modal';

const DepositModal = ({ closeModal }: { closeModal: () => void }) => {
  const renderHeader = () => (
    <div className="g-tac">
      <Logo width={92} short type="colorWhite" />
    </div>
  );

  return (
    <Modal header={renderHeader}>
      <div className="modalInner">
        <Typography type="bodyAlt">Deposit has started</Typography>
        <Typography>
          Your deposit should have been initiated and will show up shortly in
          the transaction list below.
        </Typography>
        <div className="modalActions">
          <Button onClick={closeModal}>Okay</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
