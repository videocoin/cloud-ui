import React from 'react';
import css from './styles.module.scss';
import { Icon, Typography } from 'ui-kit';
import WorkersStore from 'stores/workers';
import { observer } from 'mobx-react-lite';

const TotalEarnings = () => {
  const { rewards } = WorkersStore;
  return (
    <div className={css.root}>
      <div className={css.badge}>
        <Icon name="earnings" width={56} height={56} />
        <div>
          <Typography type="bodyThin">Total Available Earnings</Typography>
          <Typography type="display3">${rewards}</Typography>
        </div>
      </div>
      <Typography type="smallBodyThin">
        VideoCoin utilizes <a href="#">Public Mint</a> to make payments in fiat
        for work done. To withdraw earned funds, use each link below to transfer
        earning to your bank account.
      </Typography>
    </div>
  );
};

export default observer(TotalEarnings);
