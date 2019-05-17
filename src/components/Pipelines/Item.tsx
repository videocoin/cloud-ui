import React from 'react';
import { Checkbox, Icon, Typography } from 'ui-kit';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { Pipeline } from '@types';
import css from './Item.module.scss';

interface PipelineItemProps {
  pipeline: Pipeline;
}

const statusTable: { [key: string]: string } = {
  IDLE: 'Idle',
};

const PipelineItem = ({ pipeline }: PipelineItemProps) => {
  const { id, name, status } = pipeline;
  const { checkPipeline, checked } = PipelinesStore;
  const handleCheck = () => checkPipeline(id);
  const isChecked = checked.indexOf(id) >= 0;

  return (
    <tr className={cn(css.row, isChecked && css.checked)}>
      <td className={css.checkCell}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </td>
      <td className={css.statusCell}>
        <div className={css.status}>
          <Icon name="placeholderSm" width={24} height={24} />
          <div>{statusTable[status]}</div>
        </div>
      </td>
      <td className={css.nameCell}>
        <Typography type="bodyAlt">{name}</Typography>
      </td>
    </tr>
  );
};

export default observer(PipelineItem);
