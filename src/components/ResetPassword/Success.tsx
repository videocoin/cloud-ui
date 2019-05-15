import React from 'react';
import { Typography, Button, ActionBar } from 'ui-kit';
import css from './index.module.scss';

interface Props {
  closeModal: () => void;
  email: string;
}

const Success = ({ closeModal, email }: Props) => (
  <>
    <Typography type="bodyAlt">Email Sent To {email}</Typography>
    <Typography>
      Follow the instructions inside to reset your password.
    </Typography>
    <div className="modalActions">
      <ActionBar>
        <Button theme="minimal" onClick={closeModal}>
          Close
        </Button>
      </ActionBar>
    </div>
  </>
);

export default Success;
