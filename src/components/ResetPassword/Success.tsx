import React from 'react';
import { Typography, Button } from 'videocoin-ui-kit';
import css from './index.module.scss';

interface Props {
  closeModal: () => void;
  email: string;
}

const Success = ({ closeModal, email }: Props) => (
  <div className={css.success}>
    <div className={css.text}>
      <Typography type="bodyAlt">Email Sent To {email}</Typography>
      <Typography>
        Follow the instructions inside to reset your password.
      </Typography>
    </div>
    <div className={css.btns}>
      <Button theme="ghost-secondary" onClick={closeModal}>
        Close
      </Button>
    </div>
  </div>
);

export default Success;
