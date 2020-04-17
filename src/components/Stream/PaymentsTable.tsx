import React, { useState, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Spinner, Table } from 'ui-kit';
import StreamStore from 'stores/stream';
import { first, last, uniqueId } from 'lodash/fp';
import { PAYMENT_URL } from 'const';
import css from './index.module.scss';
import useSWR from 'swr';
import { IPayment } from 'stores/workers';
import qs from 'query-string';
import fetcher from 'api/fetcher';
import timeAgo from 'helpers/timeAgo';
import { convertToVID } from 'helpers/convertBalance';
import { Pagination } from 'components/Pagination';

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

const ProtocolTable = () => {
  const { stream } = StreamStore;
  const [meta, setMeta] = useState<{ cursor: string; prev?: boolean }>({
    cursor: '',
  });
  const { data } = useSWR<{ transactions: IPayment[] }>(
    stream && stream.streamContractAddress
      ? qs.stringifyUrl({
          url: `${PAYMENT_URL}/transactions`,
          query: {
            contract: stream.streamContractAddress,
            limit: '10',
            ...(meta.cursor && { cursor: meta.cursor }),
            ...(meta.prev && { prev: 'true' }),
          },
        })
      : null,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );
  if (stream && !stream.streamContractAddress) return null;
  if (!data) return <Spinner type="inline" />;
  const handleNext = (): void => {
    if (!data) return;
    const lastTransaction = last(data.transactions);
    setMeta({
      cursor: lastTransaction ? lastTransaction.cursor : meta.cursor + 1,
      prev: false,
    });
  };
  const handlePrev = (): void => {
    if (!data) return;
    const firstTransaction = first(data.transactions);
    setMeta({
      cursor: firstTransaction ? firstTransaction.cursor : meta.cursor,
      prev: true,
    });
  };

  const renderRow = (row: IPayment): ReactNode => (
    <tr key={uniqueId('event')} className={css.row}>
      <td className={css.timeCell}>{timeAgo(+row.localTimestamp * 1000)}</td>
      <td>{row.localBlockHash}</td>
      <td>{row.foreignHash}</td>
      <td>{row.signer}</td>
      <td>${convertToVID(row.value)}</td>
    </tr>
  );

  return (
    <div className={css.protocol}>
      <Table fields={fields} data={data.transactions} renderRow={renderRow} />;
      <div className={css.pagination}>
        <Pagination
          disabledPrev={
            data.transactions.length && data.transactions.length < 10
          }
          disabled={!data}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default observer(ProtocolTable);
