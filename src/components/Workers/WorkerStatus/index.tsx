import React from 'react';
import cn from 'classnames';
import css from './status.module.scss';

interface WorkerStatus {
  status: string;
  name: string;
}

const WorkerStatus = ({ status, name }: WorkerStatus) => {
  return (
    <div className={css.root}>
      <div
        data-testid="status"
        className={cn(css.status, css[status.toLowerCase()])}
      />
      <div data-testid="name" className={css.name}>
        {name.toLowerCase()}
      </div>
    </div>
  );
};

export default WorkerStatus;
