import React from 'react';
import { ActionBar, Button, Typography } from 'ui-kit';
import Modal from '../Modal';

const PublisherServiceAgreements = ({
  closeModal,
  onConfirm,
}: {
  closeModal: () => void;
  onConfirm: () => void;
}) => {
  const handleCancel = () => {
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
          To enable publisher features, you must read and agree to our publisher{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkPrivacyPolicy.html"
          >
            Privacy Policy
          </a>
          ,&nbsp;
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkWorkerTermsofService.html"
          >
            Worker Terms of Service
          </a>
          &nbsp;,&nbsp;
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkDelegatorTermsofService.html"
          >
            Delegator Terms of Service
          </a>
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
