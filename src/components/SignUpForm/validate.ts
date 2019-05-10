import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .required()
    .min(2, 'Seems a bit short...'),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  agree: Yup.boolean().oneOf([true]),
});
