import React from 'react';
import { FieldProps } from 'formik';
import { Checkbox as BaseCheckbox, CheckboxProps } from 'ui-kit';

const Checkbox = ({
  field,
  children,
  ...baseCheckboxProps
}: FieldProps & CheckboxProps) => {
  return (
    <BaseCheckbox {...field} {...baseCheckboxProps}>
      {children}
    </BaseCheckbox>
  );
};

export default Checkbox;
