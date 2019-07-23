import React from 'react';
import PipelinesTable from 'components/Pipelines/Table';
import css from './index.module.scss';

const Pipelines = () => {
  return (
    <div className={css.root}>
      <PipelinesTable />
    </div>
  );
};

export default Pipelines;
