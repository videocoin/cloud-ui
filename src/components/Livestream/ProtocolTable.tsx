import React from 'react';
import { Table, Field } from 'ui-kit';
import StreamStore from 'stores/stream';
import { IProtocol } from 'stores/models/stream';
import css from './index.module.scss';

const ProtocolTable = () => {
  const { protocol } = StreamStore;
  const fields: Field[] = [
    {
      name: 'type',
      label: 'Type',
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

  const renderRow = (item: IProtocol) => (
    <tr>
      <td className={css.cell}>{item.type}</td>
      <td className={css.cell}>{item.hash}</td>
      <td className={css.cell}>{item.from}</td>
      <td className={css.cell}>{item.to}</td>
      <td className={css.cell}>{item.source}</td>
    </tr>
  );

  return <Table fields={fields} data={protocol} renderRow={renderRow} />;
};

export default ProtocolTable;
