import React from 'react';
import { FieldConfig, useField } from 'formik';
import { Checkbox as BaseCheckbox, CheckboxProps } from 'ui-kit';

type Props = Omit<CheckboxProps, 'value' | 'onChange'> & FieldConfig;

const Checkbox = ({ children, ...baseCheckboxProps }: Props) => {
  const [field] = useField(baseCheckboxProps);

  return (
    <BaseCheckbox {...field} {...baseCheckboxProps}>
      {children}
    </BaseCheckbox>
  );
};

export default Checkbox;
