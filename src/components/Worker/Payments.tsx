import React, { ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { first, last } from 'lodash/fp';
import { Spinner, Table, Typography } from 'ui-kit';
import qs from 'query-string';
import { uniqueId } from 'lodash/fp';
import css from './styles.module.scss';
import { convertToVID } from 'helpers/convertBalance';
import workersStore, { IPayment } from 'stores/workers';
import useSWR from 'swr';
import { PAYMENT_URL } from 'const';
import fetcher from 'api/fetcher';
import { Pagination } from 'components/Pagination';
import timeAgo from 'helpers/timeAgo';

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

const renderRow = (row: IPayment): ReactNode => {
  const { localTimestamp, localBlockHash, foreignHash, signer, value } = row;
  return (
    <tr key={uniqueId('event')} className={css.row}>
      <td className={css.timeCell}>{timeAgo(+localTimestamp * 1000)}</td>
      <td>{localBlockHash}</td>
      <td>{foreignHash}</td>
      <td>{signer}</td>
      <td>${convertToVID(value)}</td>
    </tr>
  );
};

const Payments = () => {
  const { worker } = workersStore;
  const [meta, setMeta] = useState<{ cursor: string; prev?: boolean }>({
    cursor: '',
  });
  const { data } = useSWR<{ transactions: IPayment[] }>(
    worker && worker.address
      ? qs.stringifyUrl({
          url: `${PAYMENT_URL}/transactions`,
          query: {
            receiver: worker.address,
            limit: '10',
            ...(meta.cursor && { cursor: meta.cursor }),
            ...(meta.prev && { prev: 'true' }),
          },
        })
      : null,
    fetcher,
  );
  if (worker && !worker.address) return null;
  if (!data) return <Spinner />;
  const { transactions } = data;
  const handleNext = (): void => {
    const lastTransaction = last(transactions);
    setMeta({
      cursor: lastTransaction ? lastTransaction.cursor : meta.cursor + 1,
      prev: false,
    });
  };
  const handlePrev = (): void => {
    const firstTransaction = first(transactions);
    setMeta({
      cursor: firstTransaction ? firstTransaction.cursor : meta.cursor,
      prev: true,
    });
  };

  return (
    <div>
      <Typography type="subtitle">Payments</Typography>
      <Table fields={fields} data={transactions} renderRow={renderRow} />;
      <div className={css.pagination}>
        <Pagination
          disabledPrev={transactions.length && transactions.length < 10}
          disabled={!data}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default observer(Payments);
