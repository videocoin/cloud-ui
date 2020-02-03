import React, { useState, FormEvent } from 'react';
import { Typography } from 'ui-kit';
import cn from 'classnames';
import css from './switchSource.module.scss';

const SwitchInputSource = ({
  onChange,
  disabled,
}: {
  onChange: (val: string) => void;
  disabled: boolean;
}) => {
  const [active, setActive] = useState('file');
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setActive(value);
    onChange(value);
  };

  return (
    <div className={css.root}>
      <Typography>From</Typography>
      <div className={cn(css.wrap, { [css.disabled]: disabled })}>
        <label htmlFor="file">
          <input
            id="file"
            type="radio"
            value="file"
            name="switch"
            onChange={handleChange}
            checked={active === 'file'}
          />
          <div className={css.label}>Computer</div>
        </label>
        <label htmlFor="url">
          <input
            id="url"
            type="radio"
            value="url"
            name="switch"
            onChange={handleChange}
            checked={active === 'url'}
          />
          <div className={css.label}>URL</div>
        </label>
        <div className={cn(css.box, { [css.right]: active === 'url' })} />
      </div>
    </div>
  );
};

export default SwitchInputSource;
