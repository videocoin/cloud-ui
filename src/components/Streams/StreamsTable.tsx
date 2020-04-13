import React from 'react';
import { Spinner, Typography } from 'ui-kit';
import { map } from 'lodash/fp';
import StreamsStore from 'stores/streams';
import { TStream } from 'stores/types';
import { observer } from 'mobx-react-lite';
import StreamItem from './Item';
import css from './Table.module.scss';

const fields = [
  {
    name: 'status',
    label: 'Status',
    colspan: 2,
  },
  {
    name: 'streamId',
    label: 'Stream ID',
  },
  {
    name: 'name',
    label: 'Stream Name',
  },
  {
    name: 'date',
    label: 'Created on',
  },
  {
    name: 'spent',
    label: 'Total Spent',
  },
];

const StreamsTable = () => {
  const { checkStream, checked, items, isLoading, isPending } = StreamsStore;

  const handleCheck = (stream: TStream) => checkStream(stream);

  const renderHead = () =>
    map(({ name, label, colspan = 1 }) => (
      <th key={name} colSpan={colspan}>
        <Typography type="smallBody">{label}</Typography>
      </th>
    ))(fields);

  const renderTable = () =>
    map(
      (stream: TStream) => (
        <StreamItem
          key={stream.id}
          stream={stream}
          checked={checked}
          onCheck={handleCheck}
        />
      ),
      items,
    );

  if (isPending || isLoading) {
    return <Spinner />;
  }

  if (!items.length) {
    return (
      <Typography className={css.empty} type="title" align="center">
        No Streams Yet
      </Typography>
    );
  }

  return (
    <>
      <table className={css.root}>
        <thead>
          <tr>{renderHead()}</tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </>
  );
};

export default observer(StreamsTable);
