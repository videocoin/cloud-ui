import React from 'react';
import { ErrorMessage, FieldConfig, useField } from 'formik';
import { Input as BaseInput, InputProps, FieldAction } from 'ui-kit';
import css from './index.module.scss';

type Props = Omit<InputProps, 'value' | 'onChange'> & FieldConfig;

const Input = (props: Props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const hasError = touched ? Boolean(error) : false;

  return (
    <BaseInput
      {...props}
      {...field}
      error={hasError}
      postfix={() => (
        <ErrorMessage name={field.name}>
          {(msg) => (
            <FieldAction color="pink" icon="incomplete" className={css.postfix}>
              {msg}
            </FieldAction>
          )}
        </ErrorMessage>
      )}
    />
  );
};

export default Input;
