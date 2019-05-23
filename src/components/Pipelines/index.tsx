import React from 'react';
import PipelinesTable from 'components/Pipelines/Table';
import css from './index.module.scss';
import GettingStarted from './GettingStarted';

const Pipelines = () => {
  return (
    <div className={css.root}>
      <GettingStarted />
      <PipelinesTable />
    </div>
  );
};

export default Pipelines;
