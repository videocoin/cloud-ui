import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .required('Full Name is left empty')
    .min(2, 'Full Name is 1 character long'),
  email: Yup.string()
    .email('Email must be a valid')
    .required('Email is left empty'),
  password: Yup.string().required('Password is left empty'),
  confirmPassword: Yup.string()
    .required('Confirm Password is left empty')
    .oneOf([Yup.ref('password')], 'Password and Confirm Password do not match'),
  agree: Yup.boolean().oneOf([true]),
});
