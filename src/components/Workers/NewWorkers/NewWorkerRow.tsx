import React from 'react';
import { observer } from 'mobx-react-lite';
import { indexOf } from 'lodash/fp';
import { Checkbox, Typography } from 'ui-kit';
import WorkerStatus from 'components/Workers/WorkerStatus';
import WorkersStore, { IWorker } from 'stores/workers';
import { Link } from '@reach/router';
import css from './styles.module.scss';

const NewWorkerRow = ({ id, name }: IWorker) => {
  const { checked, checkWorker } = WorkersStore;
  const handleCheck = () => checkWorker(id);
  const isChecked = indexOf(id)(checked) >= 0;

  return (
    <Link to={id} className={css.row}>
      <div className={css.check}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </div>
      <WorkerStatus status="unregistered" name="Unregistered" />
      <div className={css.name}>
        <Typography type="body">{name}</Typography>&nbsp;
        <Typography type="smallBodyThin">(Setup Required)</Typography>
      </div>
      <Typography className={css.id} type="smallBodyThin">
        {id}
      </Typography>
    </Link>
  );
};

export default observer(NewWorkerRow);
