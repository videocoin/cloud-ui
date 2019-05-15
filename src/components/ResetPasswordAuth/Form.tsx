import React from 'react';
import { ActionBar, Button, Typography } from 'ui-kit';

interface FormProps {
  email: string;
  closeModal: () => void;
  isLoading: boolean;
  handleReset: () => void;
}

const Form = ({ email, closeModal, isLoading, handleReset }: FormProps) => {
  return (
    <>
      <Typography className="mb10" theme="light" type="bodyAlt">
        Reset Password?
      </Typography>
      <Typography>
        An email will be sent to {email} with instructions and a link to reset
        your password.
      </Typography>
      <div className="modalActions">
        <ActionBar>
          <Button theme="minimal" onClick={closeModal}>
            Cancel
          </Button>
          <Button loading={isLoading} onClick={handleReset}>
            Reset
          </Button>
        </ActionBar>
      </div>
    </>
  );
};

export default Form;
