import React from 'react';
import { Table, Field } from 'ui-kit';
import css from './index.module.scss';

interface ProtocolItem {
  type: string;
  age: string;
  hash: string;
  from: string;
  to: string;
  vid: number;
}

const ProtocolTable = () => {
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

  const data: ProtocolItem[] = [
    {
      type: 'Protocol',
      age: '5 sec',
      hash: '123123123',
      from: '123123123',
      to: '123123123',
      vid: 24.23,
    },
  ];

  const renderRow = (item: ProtocolItem) => (
    <tr>
      <td>{item.type}</td>
      <td>{item.age}</td>
      <td>{item.hash}</td>
      <td>{item.from}</td>
      <td>{item.to}</td>
      <td>{item.vid}</td>
    </tr>
  );

  return <Table fields={fields} data={data} renderRow={renderRow} />;
};

export default ProtocolTable;
