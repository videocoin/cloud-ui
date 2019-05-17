import React from 'react';
import { Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';

const BalanceBadge = () => {
  const { balance } = UserStore;
  return (
    <div className={css.root}>
      <img src="http://placehold.it/62x40" alt="" />
      <Typography className={css.balance} type="smallTitle">
        {balance}
      </Typography>
      <Typography>VID Tokens</Typography>
    </div>
  );
};

export default observer(BalanceBadge);
