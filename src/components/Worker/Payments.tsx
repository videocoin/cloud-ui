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
    <td>{row.localBlockHash}</td>
    <td>{row.foreignHash}</td>
    <td>{row.signer}</td>
    <td>${convertToVID(row.value)}</td>
  </tr>
);

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

  return (
    <div>
      <Typography type="subtitle">Payments</Typography>
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

export default observer(Payments);
