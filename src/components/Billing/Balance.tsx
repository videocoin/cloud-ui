import React from 'react';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';

const Balance = () => {
  return (
    <div className={css.balance}>
      <Typography type="display4">$254.98</Typography>
      <Typography type="bodyThin">Paid in current period</Typography>
    </div>
  );
};

export default Balance;
