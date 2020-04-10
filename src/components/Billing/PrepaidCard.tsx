import React from 'react';
import { observer } from 'mobx-react-lite';
import billingStore from 'stores/billing';
import truncateBalance from 'helpers/truncateBalance';
import css from './details.module.scss';

const PrepaidCard = () => {
  const { billing } = billingStore;

  return (
    <div className={css.prepaidCard}>
      <div className={css.prepaidCardTop}>
        ${truncateBalance(billing.balance)}
      </div>
    </div>
  );
};

export default observer(PrepaidCard);
