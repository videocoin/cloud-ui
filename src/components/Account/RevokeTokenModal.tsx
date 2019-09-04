import React from 'react';
import Modal from 'components/Modal';
import { ActionBar, Button, Typography } from 'ui-kit';

const RevokeTokenModal = ({
  closeModal,
  onConfirm,
  isDeleting,
}: {
  closeModal: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    closeModal();
  };

  return (
    <Modal>
      <div className="modalInner">
        <Typography type="bodyAlt">Revoke API Token?</Typography>
        <Typography type="smallBody">
          Revoking your API token will cause existing applications that use this
          token to be unable to access the VideoCoin Network.
        </Typography>
        <div className="modalActions">
          <ActionBar>
            <Button theme="minimal" onClick={closeModal}>
              Cancel
            </Button>
            <Button loading={isDeleting} onClick={handleConfirm}>
              Revoke
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default RevokeTokenModal;
