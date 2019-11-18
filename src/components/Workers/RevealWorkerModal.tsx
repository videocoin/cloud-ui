import React from 'react';
import Modal from 'components/Modal';
import { ActionBar, Button, Typography, Input } from 'ui-kit';
import ClipboardPostfix from 'components/ClipboardPostfix';

const RevealWorkerModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input
            value="ff9slk-as9dsd-lasd8-2k3-21lkj43-asdf"
            readOnly
            postfix={() => (
              <ClipboardPostfix text="ff9slk-as9dsd-lasd8-2k3-21lkj43-asdf" />
            )}
          />
        </div>
        <Typography type="body">Setup Worker With New ID</Typography>
        <Typography type="smallBodyThin">
          Use this ID to setup your worker. Store this ID somewhere safe as it
          will only be shown this one time.
        </Typography>
        <div className="modalActions">
          <ActionBar>
            <Button onClick={closeModal}>Okay</Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default RevealWorkerModal;
