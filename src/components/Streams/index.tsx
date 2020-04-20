import React from 'react';
import GettingStarted from './GettingStarted';
import StreamsTable from './StreamsTable';
import css from './index.module.scss';
import ControlBar from './ControlBar';

const Streams = () => {
  return (
    <div className={css.root}>
      <GettingStarted />
      <StreamsTable />
      <ControlBar />
    </div>
  );
};

export default Streams;
