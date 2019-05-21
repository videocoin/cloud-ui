import { FormEventHandler, useState } from 'react';

export default (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange: FormEventHandler<HTMLInputElement> = event => {
    setValue(event.currentTarget.value || event.currentTarget.innerText);
  };

  return {
    value,
    onChange,
  };
};
