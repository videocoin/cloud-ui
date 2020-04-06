import React from 'react';
import { Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';

const BalanceBadge = () => {
  const { balance } = UserStore;

  return (
    <div className={css.root}>
      <Typography
        className={css.balance}
        type="smallTitle"
        data-testid="balance"
        theme="white"
      >
        ${balance.toFixed(2)}
      </Typography>
      <Typography className={css.title}>Pre-paid Credits</Typography>
    </div>
  );
};

export default observer(BalanceBadge);
