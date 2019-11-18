import React from 'react';
import { ActionBar, Button, Input, Typography } from 'ui-kit';
import ClipboardPostfix from 'components/ClipboardPostfix';
import Modal from '../Modal';

interface AccessTokenModal {
  closeModal: () => void;
  token: string;
}

const AccessTokenModal = ({ closeModal, token }: AccessTokenModal) => {
  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input
            value={token}
            readOnly
            label="Access Token"
            postfix={() => <ClipboardPostfix text={token} />}
          />
        </div>
        <Typography type="body">Store Your Token Securely</Typography>
        <Typography type="smallBodyThin">
          Attention - You won&apos;t ever be able to view this token again, so
          copy it down for safe keeping.
        </Typography>
      </div>
      <div className="modalActions">
        <ActionBar>
          <Button onClick={closeModal}>Finish</Button>
        </ActionBar>
      </div>
    </Modal>
  );
};

export default AccessTokenModal;
