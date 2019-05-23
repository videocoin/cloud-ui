import React from 'react';
import { withFormik, Field, FormikProps, Form } from 'formik';
import { eq, map, omit, get } from 'lodash/fp';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { Button, Typography } from 'ui-kit';
import { Link } from '@reach/router';
import css from './index.module.scss';
import { FormField, SignUpForm } from '../../@types';
import UserStore from '../../stores/user';
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

const SignUp = (props: FormikProps<SignUpForm>) => {
  const { isValid, isSubmitting } = props;
  const renderField = (field: FormField) => (
    <Field key={field.name} component={Input} {...field} />
  );

  return (
    <Form className={css.form}>
      <div className={css.fields}>
        {map(renderField, formFields)}
        <Field checked={false} name="agree" component={Checkbox}>
          <Typography>
            I agree to the <Link to="/privacy">Privacy Policy</Link>
            &nbsp;and&nbsp;
            <Link to="/terms">Terms and Conditions</Link>
          </Typography>
        </Field>
      </div>
      <Button
        disabled={!isValid}
        loading={isSubmitting}
        block
        theme="perfect-white"
        type="submit"
      >
        Join waitlist
      </Button>
    </Form>
  );
};

export default withFormik<{}, SignUpForm>({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  }),
  validationSchema,
  handleSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
    try {
      await UserStore.signUp(omit('agree', values));
      resetForm();
    } catch (e) {
      setSubmitting(false);
      if (eq(400, get('response.status')(e))) {
        const errors = get('response.data.fields')(e);

        if (errors) {
          setErrors(errors);
        }
      }
    }
  },
})(SignUp);
