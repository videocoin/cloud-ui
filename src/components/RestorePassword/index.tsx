import React from 'react';
import { eq, get, map } from 'lodash/fp';
import { Formik, Form, FormikHelpers } from 'formik';
import Modal from 'components/Modal';
import Input from 'components/UI/FormikInput';
import { Button, ActionBar } from 'ui-kit';
import { recoverPassword } from 'api/user';
import { history } from 'index';
import { FormField } from '@types';
import HttpStatus from 'http-status-codes';
import validationSchema from './validate';
import css from './index.module.scss';

interface RestorePasswordProps {
  token: string;
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

const initialValues = {
  password: '',
  confirmPassword: '',
};

const RestorePassword = ({ closeModal, token }: RestorePasswordProps) => {
  const renderField = (field: FormField) => (
    <Input key={field.name} {...field} />
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<FormValues>,
  ) => {
    try {
      await recoverPassword({ ...values, token });
      resetForm();
      closeModal();
      history.navigate('/sign-in', { replace: true });
    } catch (e) {
      setSubmitting(false);
      if (eq(HttpStatus.BAD_REQUEST, get('response.status')(e))) {
        const errors = get('response.data.fields')(e);

        setErrors(errors);
      }
      throw e;
    }
  };

  return (
    <Modal>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fields}>{map(renderField, formFields)}</div>
            <ActionBar>
              <Button theme="minimal" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid} loading={isSubmitting}>
                Send
              </Button>
            </ActionBar>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RestorePassword;
