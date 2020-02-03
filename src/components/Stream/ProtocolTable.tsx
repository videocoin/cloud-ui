import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Field, Typography, Pagination } from 'ui-kit';
import StreamStore from 'stores/stream';
import { IProtocol } from 'stores/models/stream';
import { map, uniqueId } from 'lodash/fp';
import { protocolRequestTimeout } from 'const';
import css from './index.module.scss';

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

const ProtocolTable = () => {
  const { fetchProtocol, protocolMeta, stream, protocol } = StreamStore;
  const { page, hasMore } = protocolMeta;
  const interval = useRef(null);
  const contractId = stream?.streamContractId;

  // console.log(stream);
  useEffect(() => {
    fetchProtocol(contractId, page);
    interval.current = setInterval(() => {
      fetchProtocol(contractId, page);
    }, protocolRequestTimeout);

    return () => {
      clearInterval(interval.current);
    };
  }, [contractId, fetchProtocol, page]);

  const renderRow = (item: IProtocol) => (
    <tr key={uniqueId('protocol_')}>
      <td className={css.cell}>{item.type}</td>
      <td className={css.cell}>{item.hash}</td>
      <td className={css.cell}>{item.from}</td>
      <td className={css.cell}>{item.to}</td>
      <td className={css.cell}>{item.value}</td>
    </tr>
  );

  const renderHead = () =>
    map(({ name, label, colspan = 1 }) => (
      <th key={name} colSpan={colspan}>
        <Typography type="smallBody">{label}</Typography>
      </th>
    ))(fields);

  const handlePageChange = (val: number) => {
    fetchProtocol(contractId, val);
  };

  return (
    <div className={css.protocol}>
      <table className={css.root}>
        <thead>
          <tr>{renderHead()}</tr>
        </thead>
        <tbody>{map(renderRow, protocol)}</tbody>
      </table>
      <div className={css.pagination}>
        <Pagination onChange={handlePageChange} max={!hasMore} />
      </div>
    </div>
  );
};

export default observer(ProtocolTable);
