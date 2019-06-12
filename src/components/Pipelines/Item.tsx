import React from 'react';
import { Checkbox, Icon, Typography, IconName } from 'ui-kit';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { TPipeline } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { statusTable } from 'const';
import css from './Item.module.scss';

interface PipelineItemProps {
  pipeline: TPipeline;
}

const statusIcon: { [key: string]: IconName } = {
  IDLE: 'offline',
  PENDING_REQUEST: 'awaitingInput',
  PENDING_APPROVE: 'awaitingInput',
  PENDING_CREATE: 'awaitingInput',
  PENDING_JOB: 'awaitingInput',
  RUNNING: 'streaming',
  FAILED: 'incomplete',
  COMPLETED: 'incomplete',
};

const PipelineItem = ({ pipeline }: PipelineItemProps) => {
  const { id, name, status } = pipeline;
  const { checkPipeline, checked } = PipelinesStore;
  const handleCheck = () => checkPipeline(pipeline);
  const isChecked = checked.has(pipeline.id);

  return (
    <tr className={cn(css.row, isChecked && css.checked)}>
      <td className={css.checkCell}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </td>
      <td className={css.statusCell}>
        <Link to={id} className={css.status}>
          <Icon name={statusIcon[status]} width={24} height={24} />
          <div>{statusTable[status]}</div>
        </Link>
      </td>
      <td className={css.nameCell}>
        <Link className={css.link} to={id}>
          <Typography type="bodyAlt">{name}</Typography>
        </Link>
      </td>
    </tr>
  );
};

export default observer(PipelineItem);
