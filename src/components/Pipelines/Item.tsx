import React from 'react';
import { Checkbox, Typography } from 'ui-kit';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { TPipelineItem } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import css from './Item.module.scss';

interface PipelineItemProps {
  pipeline: TPipelineItem;
}

const PipelineItem = ({ pipeline }: PipelineItemProps) => {
  const { id, name } = pipeline;
  const { checkPipeline, checked } = PipelinesStore;
  const handleCheck = () => checkPipeline(pipeline);
  const isChecked = checked.has(pipeline.id);

  return (
    <tr className={cn(css.row, isChecked && css.checked)}>
      <td className={css.checkCell}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
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
