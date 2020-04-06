import React from 'react';
import { Typography } from 'ui-kit';
import { observer } from 'mobx-react-lite';
import userStore from 'stores/user';
import css from './styles.module.scss';

const Balance = () => {
  const { balance } = userStore;

  return (
    <div className={css.balance}>
      <Typography type="display4">${balance}</Typography>
      <Typography type="bodyThin">Paid in current period</Typography>
    </div>
  );
};

export default observer(Balance);
