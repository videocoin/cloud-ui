import React, { useState, FormEvent } from 'react';
import { Typography } from 'ui-kit';
import { eq } from 'lodash/fp';
import cn from 'classnames';
import css from './switchSource.module.scss';

export enum InputSource {
  FILE = 'FILE',
  URL = 'URL',
}

const SwitchInputSource = ({
  onChange,
  disabled,
}: {
  onChange: (val: InputSource) => void;
  disabled: boolean;
}) => {
  const [active, setActive] = useState<InputSource>(InputSource.FILE);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value }: { value: any } = e.currentTarget;

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
            value={InputSource.FILE}
            name="switch"
            onChange={handleChange}
            checked={eq(active, InputSource.FILE)}
          />
          <div className={css.label}>Computer</div>
        </label>
        <label htmlFor="url">
          <input
            id="url"
            type="radio"
            value={InputSource.URL}
            name="switch"
            onChange={handleChange}
            checked={eq(active, InputSource.URL)}
          />
          <div className={css.label}>URL</div>
        </label>
        <div
          className={cn(css.box, { [css.right]: eq(active, InputSource.URL) })}
        />
      </div>
    </div>
  );
};

export default SwitchInputSource;
