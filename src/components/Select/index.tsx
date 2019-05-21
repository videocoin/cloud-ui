import React from 'react';
import { Select as BaseSelect } from 'ui-kit';
import { SelectOption } from '@types';

interface SelectProps {
  name: string;
  value: SelectOption;
  options: SelectOption[];
  onChange: (name: string, value: SelectOption) => void;
  onBlur: (name: string, value: boolean) => void;
  placeholder: string;
  isSearchable: boolean;
}

const Select = ({ onChange, onBlur, name, options, ...props }: SelectProps) => {
  const handleChange = (value: SelectOption) => {
    onChange(name, value);
  };
  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <BaseSelect
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
      options={options}
      {...props}
    />
  );
};

export default Select;
