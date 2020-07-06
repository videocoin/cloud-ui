import React from 'react';
import { FieldProps } from 'formik';
import RadioGroupBase, { RadioGroupProps } from 'ui-kit/src/Radio/Radio';

type Props = Omit<RadioGroupProps, 'name' | 'onChange'>;

const RadioGroup = ({
  field,
  children,
  ...baseRadioProps
}: FieldProps & Props) => (
  <RadioGroupBase {...field} {...baseRadioProps}>
    {children}
  </RadioGroupBase>
);

RadioGroup.RadioBtn = RadioGroupBase.RadioBtn;

export default RadioGroup;
