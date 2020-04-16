import React, { ReactNode } from 'react';
import { uniqueId } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Field, Table, Typography } from 'ui-kit';
import billingStore, { ICharge } from 'stores/billing';
import { toJS } from 'mobx';
import css from './styles.module.scss';
import { formatDuration, getPeriod } from 'components/Billing/utils';

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
    name: 'duration',
    label: 'Duration',
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

const renderRow = (row: ICharge): ReactNode => {
  const [year, day, month] = row.createdAt.substring(0, 10).split('-');
  const date = `${month}/${day}/${year}`;
  return (
    <tr key={uniqueId('event')} className={css.row}>
      <td className={css.typeCell}>
        <Typography type="smallBody">
          {row.streamIsLive ? 'Livestream' : 'Video Encoding'}
        </Typography>
      </td>
      <td className={css.profileCell}>
        <Typography type="smallBody">{row.streamProfileName}</Typography>
      </td>
      <td className={css.nameCell}>
        <Typography type="smallBody" theme="sunkissed">
          {row.streamName}
        </Typography>
      </td>
      <td>
        <Typography type="smallBody">{date}</Typography>
      </td>
      <td className={css.durationCell}>
        <Typography type="smallBody">{formatDuration(row.duration)}</Typography>
      </td>
      <td>
        <Typography type="smallBody">$ {row.cost}</Typography>
      </td>
      <td>
        <Typography type="smallBody">$ {row.totalCost}</Typography>
      </td>
    </tr>
  );
};

const StreamsTable = () => {
  const { charges } = billingStore;

  return (
    <div className={css.table}>
      <Typography className={css.period}>{getPeriod()}</Typography>
      <Table fields={fields} data={toJS(charges)} renderRow={renderRow} />;
      <div className={css.pagination}>
        {/* <Pagination onChange={handlePageChange} max={!hasMore} /> */}
      </div>
    </div>
  );
};

export default observer(StreamsTable);
