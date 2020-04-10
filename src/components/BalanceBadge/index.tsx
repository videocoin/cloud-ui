import React from 'react';
import { Typography } from 'ui-kit';
import { observer } from 'mobx-react-lite';
import billingStore from 'stores/billing';
import truncateBalance from 'helpers/truncateBalance';
import css from './index.module.scss';

const BalanceBadge = () => {
  const { billing } = billingStore;

  return (
    <div className={css.root}>
      <Typography
        className={css.balance}
        type="smallTitle"
        data-testid="balance"
        theme="white"
      >
        ${truncateBalance(billing.balance)}
      </Typography>
      <Typography className={css.title}>Pre-paid Credits</Typography>
    </div>
  );
};

export default observer(BalanceBadge);
