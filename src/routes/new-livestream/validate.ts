import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  input: Yup.string().required(),
  output: Yup.string().required(),
  profile: Yup.object().required(),
});
