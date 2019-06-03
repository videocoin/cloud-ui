import React from 'react';
import { ActionBar, Button, Input, Typography } from 'ui-kit/src';
import Modal from 'components/Modal';
import ClipboardPostfix from 'components/ClipboardPostfix';

interface ShareModalProps {
  closeModal: () => void;
}

const ShareModal = ({ closeModal }: ShareModalProps) => {
  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input
            value="https://www.videocoin.network/123456"
            readOnly
            label="Sharing URL"
            postfix={() => (
              <ClipboardPostfix text="https://www.videocoin.network/123456" />
            )}
          />
        </div>
        <Typography type="bodyAlt">Share This Livestream</Typography>
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
