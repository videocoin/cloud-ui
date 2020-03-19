import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Button, Typography, ActionBar } from 'ui-kit';
import * as Yup from 'yup';
import { resetPassword } from 'api/user';
import Input from 'components/UI/FormikInput';
import css from './index.module.scss';

interface FormProps {
  closeModal: () => void;
  onSuccess: (email: string) => void;
}

interface FormValues {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please input email address'),
});

const ResetForm = ({ closeModal, onSuccess }: FormProps) => {
  const initialValues = {
    email: '',
  };
  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      await resetPassword(values);
      resetForm();
      onSuccess(values.email);
    } catch (e) {
      setSubmitting(false);
      throw e;
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <Input name="email" label="E-mail" />
          </div>
          <Typography type="body">
            Don&apos;t remember your password?
          </Typography>
          <Typography>
            Enter your email address and we&apos;ll send you instruction on how
            to reset it.
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
      )}
    </Formik>
  );
};

export default ResetForm;
