import React from 'react';
import { includes } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Checkbox, Typography } from 'ui-kit';
import WorkerStatus from 'components/Workers/WorkerStatus';
import WorkersStore, { IWorker, Status } from 'stores/workers';
import formatBytes from 'helpers/formatBytes';
import { Link } from '@reach/router';
import css from './styles.module.scss';

const RegisteredWorkerRow = ({ id, name, status, systemInfo }: IWorker) => {
  const { checked, checkWorker } = WorkersStore;
  const handleCheck = () => checkWorker(id);
  const isChecked = includes(id)(checked);
  const canBeDeleted = !includes(status)([Status.IDLE, Status.BUSY]);
  const { cpuCores, cpuFreq, cpuUsage, memTotal, memUsage } = systemInfo;
  return (
    <tr className={css.item}>
      <td className={css.check}>
        {canBeDeleted && (
          <Checkbox checked={isChecked} onChange={handleCheck} />
        )}
      </td>
      <td>
        <WorkerStatus status={status} name={status} />
      </td>
      <td>
        <Link to={`/dashboard/workers/${id}`} className={css.name}>
          <Typography type="body">{name}</Typography>&nbsp;
        </Link>
      </td>
      <td>
        <Typography type="body" tagName="span" theme="light">
          {cpuFreq}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;ghz
        </Typography>
      </td>
      <td>
        <Typography type="body" tagName="span" theme="light">
          {cpuUsage}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;%
        </Typography>
      </td>
      <td>
        <Typography type="body" theme="light">
          {cpuCores}
        </Typography>
      </td>
      <td>
        <Typography tagName="span" type="body" theme="light">
          {formatBytes(memUsage)} / {formatBytes(memTotal)}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;gb
        </Typography>
      </td>
    </tr>
  );
};

export default observer(RegisteredWorkerRow);
