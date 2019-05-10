import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().required('Please input password'),
  confirmPassword: Yup.string()
    .required('Please input password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
