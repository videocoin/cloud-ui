import React from 'react';
import { observer } from 'mobx-react-lite';
import { includes } from 'lodash/fp';
import { Checkbox, Typography } from 'ui-kit';
import WorkerStatus from 'components/Workers/WorkerStatus';
import WorkersStore, { IWorker } from 'stores/workers';
import { Link } from '@reach/router';
import css from './styles.module.scss';

const NewWorkerRow = ({ id, name }: IWorker) => {
  const { checked, checkWorker } = WorkersStore;
  const handleCheck = () => checkWorker(id);
  const isChecked = includes(id)(checked);

  return (
    <div className={css.row}>
      <div className={css.check}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </div>
      <WorkerStatus status="unregistered" name="Unregistered" />
      <Link to={id} className={css.name}>
        <Typography type="body">{name}</Typography>&nbsp;
        <Typography type="smallBodyThin">(Setup Required)</Typography>
      </Link>
      <Typography className={css.id} type="smallBodyThin">
        {id}
      </Typography>
    </div>
  );
};

export default observer(NewWorkerRow);
