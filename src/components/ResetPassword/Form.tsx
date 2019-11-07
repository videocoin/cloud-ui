import { Field, Form, withFormik } from 'formik';
import React from 'react';
import { Button, Typography, ActionBar } from 'ui-kit';
import * as Yup from 'yup';
import { resetPassword } from 'api/user';
import Input from 'components/Input';
import css from './index.module.scss';

interface FormProps {
  closeModal: () => void;
  onSuccess: (email: string) => void;
}

interface FormValues {
  email: string;
}

const ResetForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({
    email: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Please input email address'),
  }),
  handleSubmit: async (values, { setSubmitting, props, resetForm }) => {
    try {
      await resetPassword(values);
      resetForm();
      props.onSuccess(values.email);
    } catch (e) {
      setSubmitting(false);
      throw e;
    }
  },
})(({ closeModal, isValid, isSubmitting }) => (
  <Form className={css.form}>
    <div className={css.field}>
      <Field component={Input} name="email" label="E-mail" />
    </div>
    <Typography type="body">Don&apos;t remember your password?</Typography>
    <Typography>
      Enter your email address and we&apos;ll send you instruction on how to
      reset it.
    </Typography>
    <div className="modalActions">
      <ActionBar>
        <Button theme="minimal" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid} loading={isSubmitting}>
          Send email
        </Button>
      </ActionBar>
    </div>
  </Form>
));

export default ResetForm;
