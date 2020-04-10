import React from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, IconName, Typography } from 'ui-kit';
import { map, toLower } from 'lodash/fp';
import billingStore, { ITransaction } from 'stores/billing';
import css from './details.module.scss';

const icon: Record<string, IconName> = {
  DEPOSIT: 'deposit',
  PAYMENT: 'payment',
};

const TransactionsTable = () => {
  const { transactions } = billingStore;
  const renderItem = (row: ITransaction) => (
    <tr>
      <td className={css.typeCell}>
        <div>
          <Icon name={icon[row.type] || 'deposit'} />
          <Typography type="body">{toLower(row.type)}</Typography>
        </div>
      </td>
      <td className={css.statusCell}>
        <Typography>{toLower(row.status)}</Typography>
      </td>
      <td className={css.amountCell}>
        <Typography tagName="span" type="body" theme="white">
          ${row.amount}
        </Typography>
      </td>
    </tr>
  );

  return (
    <div>
      <div className={css.tableHeader}>
        <Typography type="subtitleCaps">Transactions</Typography>
      </div>
      <table className={css.table}>{map(renderItem)(transactions)}</table>
    </div>
  );
};

export default observer(TransactionsTable);
