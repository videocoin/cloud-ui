import React from 'react';
import { Typography } from 'ui-kit';
import { map } from 'lodash/fp';
import PipelinesStore from 'stores/pipelines';
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
    name: 'name',
    label: 'Stream ID',
  },
];

const StreamsTable = () => {
  const { pipeline } = PipelinesStore;

  if (!pipeline) return null;

  const { checked, checkStream } = pipeline;

  const handleCheck = (id: string) => {
    checkStream(id);
  };

  const {
    streams: { items },
  } = pipeline;

  const renderHead = () =>
    map(({ name, label, colspan = 1 }) => (
      <th key={name} colSpan={colspan}>
        <Typography type="smallBodyAlt">{label}</Typography>
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
