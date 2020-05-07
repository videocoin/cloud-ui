import React, { ReactElement, ReactNode } from 'react';
import { uniqueId } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Field, Icon, Table } from 'ui-kit';
import UserStore from 'stores/user';
import { IWalletAction } from 'stores/models/wallet';
import css from './table.module.scss';

const fields: Field[] = [
  {
    name: 'createdAt',
    label: 'Timestamp',
  },
  {
    name: 'hash',
    label: 'Hash',
  },
  {
    name: 'type',
    label: 'Type',
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
    name: 'value',
    label: 'Value',
  },
  {
    name: 'source',
    label: 'Source',
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

const EventsTable = (): ReactElement => {
  const { actions } = UserStore;

  return (
    <div className={css.table}>
      <Table fields={fields} data={toJS(actions)} renderRow={renderRow} />;
    </div>
  );
};

export default observer(EventsTable);
