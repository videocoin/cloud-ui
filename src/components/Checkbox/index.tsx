import React from 'react';
import { FieldProps } from 'formik';
import { Checkbox as BaseCheckbox } from 'videocoin-ui-kit';
import { CheckboxProps } from 'videocoin-ui-kit/dist/components/Checkbox/Checkbox';

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
