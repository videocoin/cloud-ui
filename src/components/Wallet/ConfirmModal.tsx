import React, { FormEvent, useState } from 'react';
import { ActionBar, Button, FieldAction, Input, Typography } from 'ui-kit';
import Modal from 'components/Modal';
import { withdraw } from 'api/withdraw';
import css from 'components/Input/index.module.scss';

interface ConfirmModalProps {
  closeModal: () => void;
  amount: number;
  email: string;
  onConfirm: () => void;
  transferId: string;
}

const ConfirmModal = ({
  closeModal,
  amount,
  email,
  onConfirm,
  transferId,
}: ConfirmModalProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleCodeChange = (e: FormEvent<HTMLInputElement>) => {
    setError(false);
    setCode(e.currentTarget.value);
  };
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await withdraw({ transferId, pin: code });
      onConfirm();
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Modal>
      <div className="modalInner">
        <div className="mb30">
          <Input
            value={code}
            type="number"
            onChange={handleCodeChange}
            label="Confirmation Code"
            error={error}
            postfix={() =>
              error ? (
                <FieldAction
                  color="pink"
                  icon="incomplete"
                  className={css.postfix}
                >
                  Incorrect Code
                </FieldAction>
              ) : null
            }
          />
        </div>
        {error ? (
          <>
            <Typography type="bodyAlt">Incorrect Confirmation Code</Typography>
            <Typography type="smallBody">
              Double check the code in the email we sent you for the correct
              confirmation code.
            </Typography>
          </>
        ) : (
          <>
            <Typography type="bodyAlt">
              Confirm your withdraw of {amount} VID
            </Typography>
            <Typography type="smallBody">
              For your security, we sent a 6 digit confirmation code to {email}.
              Enter it here to start the withdraw process
            </Typography>
          </>
        )}
        <div className="modalActions">
          <ActionBar>
            <Button theme="minimal" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={handleConfirm}
              disabled={code.length < 6}
            >
              Confirm
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
