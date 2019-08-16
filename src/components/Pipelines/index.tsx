import React from 'react';
import PipelinesTable from 'components/Pipelines/Table';
import GettingStarted from 'components/Pipelines/GettingStarted';
import css from './index.module.scss';

const Pipelines = () => {
  return (
    <div className={css.root}>
      <GettingStarted />
      <PipelinesTable />
    </div>
  );
};

export default Pipelines;
