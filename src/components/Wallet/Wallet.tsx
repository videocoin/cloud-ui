import React from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { VIDBalance } from 'helpers/convertBalance';
import css from './index.module.scss';

const Wallet = () => {
  const { address, balance } = UserStore;

  return (
    <div className={css.walletBody}>
      <Typography type="body">Primary Wallet</Typography>
      <div className={css.balance}>
        <Typography type="display2" theme="white">
          {VIDBalance(balance)}
        </Typography>
        <Typography type="subtitle" theme="white">
          VID
        </Typography>
      </div>
      <Typography type="body" theme="white">
        Wallet Address
      </Typography>
      <div className={css.address}>
        <Typography type="smallBody">{address}</Typography>
      </div>
    </div>
  );
};

export default observer(Wallet);
