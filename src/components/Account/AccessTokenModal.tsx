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
        <Typography type="body">Give Your Token A Name</Typography>
        <Typography type="smallBodyThin">
          Be descriptive so that later you&apos;ll remember what your token was
          used for.
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
