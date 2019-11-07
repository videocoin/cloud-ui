import React, { FormEvent, useState } from 'react';
import { ActionBar, Button, Input, Typography } from 'ui-kit';
import Modal from '../Modal';

interface NewTokenModal {
  closeModal: () => void;
  isCreating: boolean;
  onConfirm: (name: string) => void;
}

const NewTokenModal = ({
  closeModal,
  isCreating,
  onConfirm,
}: NewTokenModal) => {
  const [name, setName] = useState('');
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const handleGenerate = () => onConfirm(name);

  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input value={name} onChange={handleChange} label="Token Name" />
        </div>
        <Typography type="body">Give Your Token A Name</Typography>
        <Typography>
          Be descriptive so that later you&apos;ll remember what your token was
          used for.
        </Typography>
      </div>
      <div className="modalActions">
        <ActionBar>
          <Button theme="minimal" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            loading={isCreating}
            disabled={!name}
            onClick={handleGenerate}
          >
            Generate Token
          </Button>
        </ActionBar>
      </div>
    </Modal>
  );
};

export default NewTokenModal;
