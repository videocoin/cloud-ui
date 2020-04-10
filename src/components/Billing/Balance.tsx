import React from 'react';
import { Typography } from 'ui-kit';
import { observer } from 'mobx-react-lite';
import billingStore from 'stores/billing';
import truncateBalance from 'helpers/truncateBalance';
import css from './styles.module.scss';

const Balance = () => {
  const { totalPaid } = billingStore;

  return (
    <div className={css.balance}>
      <Typography type="display4">${truncateBalance(totalPaid)}</Typography>
      <Typography type="bodyThin">Paid in current period</Typography>
    </div>
  );
};

export default observer(Balance);
