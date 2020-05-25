import React, { ReactNode, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, Typography } from 'ui-kit';
import { addressSchema, countrySchema, signUpEmailSchema } from './validate';
import Checkbox from 'components/UI/FormikCheckbox';
import Input from 'components/UI/FormikInput';
import Select from 'components/UI/FormikSelect';
import countries from './countries';
import { globalHistory as history, Link } from '@reach/router';
import { signUp, validateUser } from 'api/user';
import css from './index.module.scss';
import { UIRole } from 'stores/types';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
};

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: (values: typeof initialValues) => void;
}) => {
  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>,
  ) => {
    const { agree, ...data } = values;
    const { setFieldError } = helpers;
    try {
      await validateUser(data);
      onSubmit(values);
    } catch (e) {
      if (e.response.data.fields) {
        Object.keys(e.response.data.fields).forEach((field: string) => {
          setFieldError(field, e.response.data.fields[field]);
        });
      }
    }
  };
  return (
    <>
      <Typography align="center" theme="white" type="subtitle">
        VideoCoin Network Account
      </Typography>
      <div className={css.formWrapper}>
        <Formik
          validationSchema={signUpEmailSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={css.form}>
              <Input name="email" label="Email" type="email" />
              <Input name="password" label="Password" type="password" />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <Checkbox checked={false} name="agree">
                <Typography>
                  I agree to the <Link to="/privacy">Privacy Policy</Link>
                  &nbsp;and&nbsp;
                  <Link to="/terms">Terms and Conditions</Link>
                </Typography>
              </Checkbox>
              <Button block theme="perfect-white" type="submit">
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const CountryForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    country: '',
  };
  return (
    <>
      <Typography align="center" theme="white" type="subtitle">
        Additional Information (2/3)
      </Typography>
      <div className={css.formWrapper}>
        <Formik
          validationSchema={countrySchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className={css.form}>
              <Select name="country" options={countries} />
              <Input name="firstName" label="First Name" />
              <Input name="lastName" label="Last Name" />
              <Button block theme="perfect-white" type="submit">
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
const AddressForm = ({ onSubmit }: { onSubmit: any }) => {
  const initialValues = {
    address1: '',
    address2: '',
    city: '',
    region: '',
    zip: '',
  };
  return (
    <>
      <Typography align="center" theme="white" type="subtitle">
        Additional Information (3/3)
      </Typography>
      <div className={css.formWrapper}>
        <Formik
          validationSchema={addressSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
          {() => (
            <Form className={css.form}>
              <Input name="address1" label="Street Address" />
              <Input name="address2" label="Apt, Suite, Etc" />
              <Input name="city" label="City" />
              <Input name="region" label="State/province" />
              <Input name="zip" label="Postal Code" />
              <Button block theme="perfect-white" type="submit">
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const AdditionalInfoForm = ({
  emailForm,
}: {
  emailForm: typeof initialValues;
}) => {
  const [formData, setFormData] = useState<any>({});
  const [step, setStep] = useState(1);

  const handleSubmitCountryForm = (values: any) => {
    setFormData({ ...formData, ...values });
    setStep(2);
  };
  const handleSubmitAddressForm = async (
    values: any,
    helpers: FormikHelpers<any>,
  ) => {
    const { location } = history;
    const urlParams = new URLSearchParams(location.search);
    const role = urlParams.get('role');
    const isMiner = role === 'miner';
    const data = {
      ...emailForm,
      ...formData,
      country: formData.country.value,
      ...values,
      uiRole: isMiner ? UIRole.MINER : UIRole.PUBLISHER,
    };
    try {
      await signUp(data);
    } catch (e) {
      if (e.fields) {
        Object.keys(e.fields).forEach((field: string) => {
          helpers.setFieldError(field, e.fields[field]);
        });
      }
    }
  };

  const forms: Record<number, ReactNode> = {
    1: <CountryForm onSubmit={handleSubmitCountryForm} />,
    2: <AddressForm onSubmit={handleSubmitAddressForm} />,
  };
  return <>{forms[step]}</>;
};

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const handleValidate = (values: any) => {
    setFormData(values);
    setStep(2);
  };
  const forms: Record<number, ReactNode> = {
    1: <EmailForm onSubmit={handleValidate} />,
    2: <AdditionalInfoForm emailForm={formData} />,
  };
  return <div className={css.right}>{forms[step]}</div>;
};

export default SignupForm;
