import React from 'react';
import { Button, Logo, Typography } from 'ui-kit';
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
        <Typography type="bodyAlt">
          Warning, VideoCoin Network is still under development.
        </Typography>
        <Typography>
          Any ERC-20 VID deposited to this address could be lost and is not
          covered under any SLA&apos;s.
        </Typography>
        <div className="modalActions">
          <Button onClick={closeModal}>Okay</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
