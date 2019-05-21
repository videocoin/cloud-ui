import React from 'react';
import { Checkbox, Icon, Typography } from 'ui-kit';
import cn from 'classnames';
import PipelinesStore, { TPipeline } from 'stores/pipelines';
import { observer } from 'mobx-react-lite';

import css from './Item.module.scss';

interface PipelineItemProps {
  pipeline: TPipeline;
}

const statusTable: { [key: string]: string } = {
  IDLE: 'Idle',
};

const PipelineItem = ({ pipeline }: PipelineItemProps) => {
  const { name, status } = pipeline;
  const { checkPipeline, checked } = PipelinesStore;
  const handleCheck = () => checkPipeline(pipeline);
  const isChecked = checked.has(pipeline.id);

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
