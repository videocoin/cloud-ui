import React from 'react';
import { withFormik, Field, FormikProps, Form } from 'formik';
import UserStore from 'stores/user';
import { get, map } from 'lodash/fp';
import { toast } from 'react-toastify';
import Input from 'components/Input';
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

const SignIn = (props: FormikProps<SignInForm>) => {
  const { isValid, isSubmitting } = props;
  const renderField = (field: FormField) => (
    <Field key={field.name} component={Input} {...field} />
  );
  const { openModal } = ModalStore;
  const handleOpenModal = () => openModal(modalType.RESET_PASSWORD);

  return (
    <>
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
    </>
  );
};

export default withFormik<{}, SignInForm>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting }) => {
    try {
      await UserStore.signIn(values);
    } catch (e) {
      setSubmitting(false);
      toast.error(get('response.data.message', e));
      throw e;
    }
  },
})(SignIn);
