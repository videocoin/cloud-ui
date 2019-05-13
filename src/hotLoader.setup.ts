import { setConfig, cold } from 'react-hot-loader';

setConfig({
  onComponentRegister: (type, name, file) =>
    file.indexOf('node_modules') > 0 && cold(type),

  // some components are not visible as top level variables,
  // thus its not known where they were created
  onComponentCreate: (type, name) => name.indexOf('styled') > 0 && cold(type),
});
