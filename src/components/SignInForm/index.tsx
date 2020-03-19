import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import UserStore from 'stores/user';
import { get, map } from 'lodash/fp';
import { toast } from 'react-toastify';
import Input from 'components/UI/FormikInput';
import { Button } from 'ui-kit';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import { FormField, SignInForm } from '@types';
import css from './index.module.scss';
import validationSchema from './validate';

const formFields: FormField[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
];

const SignIn = () => {
  const renderField = (field: FormField) => (
    <Input key={field.name} {...field} />
  );
  const { openModal } = ModalStore;
  const handleOpenModal = () => openModal(modalType.RESET_PASSWORD);
  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<SignInForm>,
  ) => {
    try {
      await UserStore.signIn(values);
    } catch (e) {
      setSubmitting(false);
      toast.error(get('response.data.message', e));
      throw e;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fields}>{map(renderField, formFields)}</div>
          <Button
            disabled={!isValid}
            loading={isSubmitting}
            block
            type="submit"
            theme="perfect-white"
          >
            Log in
          </Button>
          <div className={css.forgotBtn}>
            <Button theme="minimal-sunkissed" onClick={handleOpenModal}>
              Forgot password?
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
