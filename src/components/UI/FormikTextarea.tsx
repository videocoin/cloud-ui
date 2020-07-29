import React from 'react';
import { ErrorMessage, FieldConfig, useField } from 'formik';
import { Textarea as BaseTextarea, TextareaProps, FieldAction } from 'ui-kit';
import css from './index.module.scss';

type Props = Omit<TextareaProps, 'value' | 'onChange'> & FieldConfig;

const Textarea = (props: Props) => {
  const [field, meta] = useField(props.name);
  const { touched, error } = meta;
  const hasError = touched ? Boolean(error) : false;

  return (
    <BaseTextarea
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

export default Textarea;
