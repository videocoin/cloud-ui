import React from 'react';
import { Select as BaseSelect } from 'ui-kit';
import { useField } from 'formik';

const Select = ({ name, ...rest }: any) => {
  const [field, , helpers] = useField(name);
  const onChange = (val: any) => {
    helpers.setValue(val);
  };
  return <BaseSelect value={field.value} onChange={onChange} {...rest} />;
};

export default Select;
