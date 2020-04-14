import React from 'react';
import { observer } from 'mobx-react-lite';
import billingStore from 'stores/billing';
import truncateBalance from 'helpers/truncateBalance';
import css from './details.module.scss';
import { ReactComponent as CardChip } from './assets/cardChip.svg';
import { ReactComponent as CardLogo } from './assets/cardLogo.svg';
import { Typography } from 'ui-kit/src/Typography';

const PrepaidCard = () => {
  const { billing } = billingStore;

  return (
    <div className={css.prepaidCard}>
      <div className={css.prepaidCardTop}>
        ${truncateBalance(billing.balance)}
      </div>
      <div className={css.cardInner}>
        <div className={css.cardChip}>
          <CardChip />
        </div>
        <Typography type="body">Prepaid Credits</Typography>
        <div className={css.cardLogo}>
          <CardLogo />
        </div>
      </div>
    </div>
  );
};

export default observer(PrepaidCard);
