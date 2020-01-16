import React, { useState } from 'react';
import { Button, ActionBar, Typography } from 'ui-kit';
import Modal from 'components/Modal';
import css from './styles.module.scss';

interface ConfirmModalProps {
  title: string;
  text?: string;
  onConfirm: () => void;
  closeModal: () => void;
  confirmText?: string;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { title, text, closeModal, onConfirm, confirmText = 'Delete' } = props;
  const [isLoading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      closeModal();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <div className="modalInner">
        <Typography type="body">{title}</Typography>
        <Typography type="smallBodyThin">{text}</Typography>
        <div className="modalActions">
          <ActionBar>
            <Button block onClick={closeModal}>
              Cancel
            </Button>
            <Button
              theme="minimal"
              loading={isLoading}
              block
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
