import React, { ReactNode } from 'react';
import { Icon, Table } from 'ui-kit';
import { toJS } from 'mobx';
import { IWalletAction } from 'stores/models/wallet';
import { uniqueId } from 'lodash/fp';
import css from './styles.module.scss';
import { convertToVID } from 'helpers/convertBalance';

const fields = [
  {
    name: 'age',
    label: 'Age',
  },
  {
    name: 'localBlockHash',
    label: 'VideoCoin Txn',
  },
  {
    name: 'foreignHash',
    label: 'Public Mint Txn',
  },
  {
    name: 'signer',
    label: 'Payment Sender',
  },
  {
    name: 'value',
    label: 'Payment',
  },
];

const renderRow = (row: any): ReactNode => (
  <tr key={uniqueId('event')} className={css.row}>
    <td className={css.timeCell}>0</td>
    <td>
      <div className={css.from}>{row.localBlockHash}</div>
    </td>
    <td>{row.foreignHash}</td>
    <td>
      <div className={css.from}>
        <span>{row.signer}</span>
      </div>
    </td>
    <td>
      <div className={css.from}>
        <span>${convertToVID(row.value)}</span>
      </div>
    </td>
  </tr>
);

const Payments = () => {
  const data: any[] = [];
  return (
    <div>
      <Table fields={fields} data={data} renderRow={renderRow} />;
    </div>
  );
};

export default Payments;
