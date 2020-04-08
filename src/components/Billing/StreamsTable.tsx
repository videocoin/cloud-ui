import React, { ReactNode } from 'react';
import { Pagination } from 'ui-kit/dist/Pagination';
import { IWalletAction } from 'stores/models/wallet';
import { uniqueId } from 'lodash/fp';
import { Field, Table, Icon, Typography } from 'ui-kit';
import getPeriod from './getPeriod';
import css from './styles.module.scss';

const fields: Field[] = [
  {
    name: 'type',
    label: 'Type',
  },
  {
    name: 'profile',
    label: 'Profile',
  },
  {
    name: 'stream',
    label: 'Stream',
  },
  {
    name: 'date',
    label: 'Date',
  },
  {
    name: 'amount',
    label: 'Amount',
  },
  {
    name: 'cost',
    label: 'Cost',
  },
  {
    name: 'total',
    label: 'Total Cost',
  },
];
const renderRow = (row: IWalletAction): ReactNode => (
  <tr key={uniqueId('event')} className={css.row}>
    <td className={css.timeCell}>{row.createdAt}</td>
    <td>
      <div className={css.from}>{row.hash}</div>
    </td>
    <td>{row.type}</td>
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
    <td className={css.valueCell}>{row.value}</td>
    <td className={css.sourceCell}>{row.source}</td>
  </tr>
);

const StreamsTable = () => {
  return (
    <div className={css.table}>
      <Typography className={css.period}>{getPeriod()}</Typography>
      <Table fields={fields} data={[]} renderRow={renderRow} />;
      <div className={css.pagination}>
        {/* <Pagination onChange={handlePageChange} max={!hasMore} /> */}
      </div>
    </div>
  );
};

export default StreamsTable;
