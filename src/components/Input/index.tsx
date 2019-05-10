import React from 'react';
import { ErrorMessage, FieldProps } from 'formik';
import { Input as BaseInput, FieldAction } from 'videocoin-ui-kit';

const Input = ({ field, form, ...baseInputProps }: FieldProps) => {
  const { touched, errors } = form;
  const hasError = Boolean(touched[field.name] && errors[field.name]);
  return (
    <BaseInput
      {...field}
      {...baseInputProps}
      error={hasError}
      postfix={() => (
        <ErrorMessage name={field.name}>
          {msg => (
            <FieldAction color="pink" icon="warn">
              {msg}
            </FieldAction>
          )}
        </ErrorMessage>
      )}
    />
  );
};

export default Input;
