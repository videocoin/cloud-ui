import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .max(255, 'Stream name must be shorter than 255 characters')
    .required(),
  inputType: Yup.string().required(),
  outputType: Yup.string().required(),
  profile: Yup.object().required(),
});
