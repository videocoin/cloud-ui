import React from 'react';
import { ActionBar, Button, Typography } from 'ui-kit';
import Modal from '../Modal';

const PublisherServiceAgreements = ({
  closeModal,
  onConfirm,
  onCancel,
}: {
  closeModal: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const handleCancel = () => {
    onCancel();
    closeModal();
  };
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };
  return (
    <Modal>
      <div className="modalInner">
        <Typography type="body">Publisher Service Agreements</Typography>
        <Typography type="smallBodyThin">
          To enable publisher features, you must read and agree to our publisher
          <a href="#">Terms and Conditions</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </Typography>
      </div>
      <div data-testid="accessTokenBtn" className="modalActions">
        <ActionBar>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>I agree</Button>
        </ActionBar>
      </div>
    </Modal>
  );
};

export default PublisherServiceAgreements;
