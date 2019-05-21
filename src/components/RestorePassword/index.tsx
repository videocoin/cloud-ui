import React from 'react';
import { eq, get, map } from 'lodash/fp';
import { withFormik, Form, Field } from 'formik';
import Modal from 'components/Modal';
import Input from 'components/Input';
import { Button, ActionBar } from 'ui-kit';
import { recoverPassword } from 'api/user';
import { FormField } from '@types';
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

const RestorePassword = withFormik<RestorePasswordProps, FormValues>({
  mapPropsToValues: () => ({
    password: '',
    confirmPassword: '',
  }),
  validationSchema,
  handleSubmit: async (
    values,
    { setSubmitting, props, resetForm, setErrors },
  ) => {
    try {
      await recoverPassword({ ...values, token: props.token });
      resetForm();
      props.closeModal();
    } catch (e) {
      setSubmitting(false);
      if (eq(400, get('response.status')(e))) {
        const errors = get('response.data.fields')(e);

        setErrors(errors);
      }
      throw e;
    }
  },
})(({ closeModal, isValid, isSubmitting }) => {
  const renderField = (field: FormField) => (
    <Field key={field.name} component={Input} {...field} />
  );

  return (
    <Modal>
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
    </Modal>
  );
});

export default RestorePassword;
