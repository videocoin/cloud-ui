import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  allowThirdpartyDelegates: yup.boolean(),
  orgName: yup.string().when('allowThirdpartyDelegates', {
    is: true,
    then: yup.string().required('Organization is a required field'),
  }),
  orgEmail: yup
    .string()
    .email()
    .when('allowThirdpartyDelegates', {
      is: true,
      then: yup.string().email().required('Email is a required field'),
    }),
  orgDesc: yup.string().when('allowThirdpartyDelegates', {
    is: true,
    then: yup.string().required('Description is a required field'),
  }),
  delegatePolicy: yup.string().when('allowThirdpartyDelegates', {
    is: true,
    then: yup.string().required('Delegate payout is a required field'),
  }),
});

export default validationSchema;
