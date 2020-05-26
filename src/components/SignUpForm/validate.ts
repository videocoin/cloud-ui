import * as Yup from 'yup';

export const signUpEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid')
    .required('Email is left empty'),
  password: Yup.string().required('Password is left empty'),
  confirmPassword: Yup.string()
    .required('Confirm Password is left empty')
    .oneOf([Yup.ref('password')], 'Password and Confirm Password do not match'),
  agree: Yup.boolean().oneOf([true]),
});

export const countrySchema = Yup.object().shape({
  country: Yup.object()
    .shape({
      id: Yup.string(),
      label: Yup.string(),
    })
    .required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});
export const addressSchema = Yup.object().shape({
  address1: Yup.string().required(),
  address2: Yup.string(),
  region: Yup.string(),
  city: Yup.string().required(),
  zip: Yup.string().required('Postal Code is a required field'),
});
