import React from 'react';
import { Icon, Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { observer } from 'mobx-react-lite';
import { VIDBalance } from 'helpers/convertBalance';
import css from './index.module.scss';

const BalanceBadge = () => {
  const { balance } = UserStore;

  return (
    <div className={css.root}>
      <Icon name="VIDToken" width={64} />
      <Typography className={css.balance} type="smallTitle">
        {VIDBalance(balance)}
      </Typography>
      <Typography>VID Tokens</Typography>
    </div>
  );
};

export default observer(BalanceBadge);
