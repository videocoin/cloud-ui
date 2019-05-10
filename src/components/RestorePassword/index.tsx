import React from 'react';
import { map } from 'lodash/fp';
import { withFormik, Form, Field } from 'formik';
import Modal from 'components/Modal';
import Input from 'components/Input';
import { Button } from 'videocoin-ui-kit';
import { recoverPassword } from 'api/user';
import { FormField } from '@types';
import validationSchema from './validate';
import css from './index.module.scss';

interface RestorePasswordProps {
  token: string;
  isOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const formFields: FormField[] = [
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
];

const RestorePassword = withFormik<RestorePasswordProps, FormValues>({
  mapPropsToValues: () => ({
    password: '',
    confirmPassword: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, props, resetForm }) => {
    try {
      await recoverPassword({ ...values, token: props.token });
      resetForm();
      props.closeModal();
    } catch (e) {
      setSubmitting(false);
      throw e;
    }
  },
})(({ isOpen, closeModal, isValid, isSubmitting }) => {
  const renderField = (field: FormField) => (
    <Field key={field.name} component={Input} {...field} />
  );
  return (
    <Modal hideCloseButton isOpen={isOpen} close={closeModal}>
      <Form className={css.form}>
        <div className={css.fields}>{map(renderField, formFields)}</div>
        <div>
          <Button theme="ghost-secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Send
          </Button>
        </div>
      </Form>
    </Modal>
  );
});

export default RestorePassword;
