import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { eq, map, omit, get } from 'lodash/fp';
import Input from 'components/UI/FormikInput';
import Checkbox from 'components/UI/FormikCheckbox';
import { Button, Typography } from 'ui-kit';
import { Link } from '@reach/router';
import UserStore from 'stores/user';
import HttpStatus from 'http-status-codes';
import { FormField, SignUpForm } from '@types';
import css from './index.module.scss';
import validationSchema from './validate';

const formFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
  },
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
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
];

const SignUp = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  };
  const renderField = (field: FormField) => (
    <Input key={field.name} {...field} />
  );
  const onSubmit = async (
    values: typeof initialValues,
    { setErrors, resetForm, setSubmitting }: FormikHelpers<SignUpForm>,
  ) => {
    try {
      await UserStore.signUp(omit('agree', values));
      resetForm();
    } catch (e) {
      setSubmitting(false);
      if (eq(HttpStatus.BAD_REQUEST, get('response.status')(e))) {
        const errors = get('response.data.fields')(e);

        if (errors) {
          setErrors(errors);
        }
      }
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={css.fields}>
            {map(renderField, formFields)}
            <Checkbox checked={false} name="agree">
              <Typography>
                I agree to the <Link to="/privacy">Privacy Policy</Link>
                &nbsp;and&nbsp;
                <Link to="/terms">Terms and Conditions</Link>
              </Typography>
            </Checkbox>
          </div>
          <Button
            disabled={!isValid}
            loading={isSubmitting}
            block
            theme="perfect-white"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
