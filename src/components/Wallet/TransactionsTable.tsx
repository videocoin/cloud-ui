import React, { ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Field, Icon, Pagination, Table } from 'ui-kit';
import timeAgo from 'helpers/timeAgo';
import UserStore from 'stores/user';
import { IWalletTransaction } from 'stores/models/wallet';
import css from './table.module.scss';

const fields: Field[] = [
  {
    name: 'type',
    label: 'Type',
  },
  {
    name: 'age',
    label: 'Age',
  },
  {
    name: 'hash',
    label: 'Transaction Hash',
  },
  {
    name: 'from',
    label: 'From',
  },
  {
    name: 'to',
    label: 'To',
  },
  {
    name: 'vid',
    label: 'VID',
  },
];

const renderRow = (row: IWalletTransaction): ReactNode => (
  <tr key={row.hash} className={css.row}>
    <td className={css.protocolCell}>Protocol</td>
    <td className={css.ageCell}>{timeAgo(row.timestamp)}</td>
    <td>
      <div className={css.from}>
        <span>{row.hash}</span>
      </div>
    </td>
    <td>
      <div className={css.from}>
        <span>{row.from}</span>{' '}
        <Icon name="transaction" width={24} height={24} />
      </div>
    </td>
    <td>
      <div className={css.from}>
        <span>{row.to}</span>
      </div>
    </td>
    <td>{row.value}</td>
  </tr>
);

const TransactionsTable = (): ReactElement => {
  const { transactions, transactionsMeta, fetchTransactions } = UserStore;
  const { hasMore } = transactionsMeta;
  const handlePageChange = (page: number) => {
    fetchTransactions({ page });
  };

  return (
    <div className={css.table}>
      <Table fields={fields} data={toJS(transactions)} renderRow={renderRow} />;
      <div className={css.pagination}>
        <Pagination onChange={handlePageChange} max={!hasMore} />
      </div>
    </div>
  );
};

export default observer(TransactionsTable);
