import React from 'react';
import { Typography, Button, ActionBar } from 'ui-kit';

interface Props {
  closeModal: () => void;
}

const Success = ({ closeModal }: Props) => (
  <>
    <Typography className="mb10" type="bodyAlt">
      Email Sent
    </Typography>
    <Typography>
      Check your email inbox for instructions on how to reset your password.
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
