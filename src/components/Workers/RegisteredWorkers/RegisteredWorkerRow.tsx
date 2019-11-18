import React from 'react';
import { includes, indexOf } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Checkbox, Typography } from 'ui-kit';
import WorkerStatus from 'components/Workers/WorkerStatus';
import WorkersStore, { IWorker } from 'stores/workers';
import formatBytes from 'helpers/formatBytes';
import css from './styles.module.scss';

const RegisteredWorkerRow = ({ id, name, status, systemInfo }: IWorker) => {
  const { checked, checkWorker } = WorkersStore;
  const handleCheck = () => checkWorker(id);
  const isChecked = indexOf(id)(checked) >= 0;
  const canBeDeleted = !includes(status)(['IDLE', 'BUSY']);

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
        <div className={css.name}>
          <Typography type="body">{name}</Typography>&nbsp;
        </div>
      </td>
      <td>
        <Typography type="body" tagName="span" theme="light">
          {systemInfo.cpuFreq}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;ghz
        </Typography>
      </td>
      <td>
        <Typography type="body" tagName="span" theme="light">
          {systemInfo.cpuUsage}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;%
        </Typography>
      </td>
      <td>
        <Typography type="body" theme="light">
          {systemInfo.cpuCores}
        </Typography>
      </td>
      <td>
        <Typography tagName="span" type="body" theme="light">
          {formatBytes(systemInfo.memUsage)} /{' '}
          {formatBytes(systemInfo.memTotal)}
        </Typography>
        <Typography tagName="span" theme="light" type="smallBodyThin">
          &nbsp;gb
        </Typography>
      </td>
    </tr>
  );
};

export default observer(RegisteredWorkerRow);
