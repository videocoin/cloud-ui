import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  inputType: Yup.string().required(),
  outputType: Yup.string().required(),
  profile: Yup.object().required(),
});
