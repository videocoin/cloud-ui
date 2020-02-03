import React from 'react';
import GettingStarted from './GettingStarted';
import StreamsTable from './StreamsTable';
import css from './index.module.scss';

const Streams = () => {
  return (
    <div className={css.root}>
      <GettingStarted />
      <StreamsTable />
    </div>
  );
};

export default Streams;
