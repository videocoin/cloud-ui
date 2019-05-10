import React from 'react';
import { withFormik, Field, FormikProps, Form } from 'formik';
import UserStore from 'models/User';
import { equals, get, map } from 'lodash/fp';
import Input from 'components/Input';
import { Button } from 'videocoin-ui-kit';
import { FormField, SignInForm } from '@types';
import ResetPassword from 'components/ResetPassword';
import { navigate } from '@reach/router';
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
  return (
    <>
      <Form className={css.form}>
        <div className={css.fields}>{map(renderField, formFields)}</div>
        <Button
          disabled={!isValid || isSubmitting}
          isBlock
          type="submit"
          theme="white"
        >
          Log in
        </Button>
      </Form>
      <ResetPassword />
    </>
  );
};

export default withFormik<{}, SignInForm>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setErrors, setSubmitting }) => {
    try {
      const res = await UserStore.signIn(values);
      navigate(res.data.activated ? '/dashboard' : '/pending');
    } catch (e) {
      setSubmitting(false);
      if (equals(400, get('response.status')(e))) {
        const errors = get('response.data.fields')(e);
        setErrors(errors);
      }
    }
  },
})(SignIn);
