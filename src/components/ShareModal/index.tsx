import React from 'react';
import { ActionBar, Button, Input, Typography } from 'ui-kit';
import Modal from 'components/Modal';
import ClipboardPostfix from 'components/ClipboardPostfix';

interface ShareModalProps {
  closeModal: () => void;
  accessCode: string;
}

const ShareModal = ({ closeModal, accessCode }: ShareModalProps) => {
  const url = `https://${window.location.hostname}/streams/shared/${accessCode}`;

  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input
            value={url}
            readOnly
            label="Sharing URL"
            postfix={() => <ClipboardPostfix text={url} />}
          />
        </div>
        <Typography type="body">Share This Stream</Typography>
        <Typography type="smallBody">
          Note: This is not the direct output URL but rather a VideoCoin branded
          viewer.
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

ShareModal.defaultProps = {};

export default ShareModal;
