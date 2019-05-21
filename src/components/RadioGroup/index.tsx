import React, { ReactNode } from 'react';
import { FieldProps } from 'formik';
import { RadioGroup as RadioGroupBase } from 'ui-kit';

const RadioGroup = ({
  field,
  children,
  ...baseRadioProps
}: FieldProps & { children: ReactNode }) => (
  <RadioGroupBase {...field} {...baseRadioProps}>
    {children}
  </RadioGroupBase>
);

RadioGroup.RadioBtn = RadioGroupBase.RadioBtn;

export default RadioGroup;
