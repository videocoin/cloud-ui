import React from 'react';
import { Checkbox, Icon, Typography, IconName } from 'ui-kit';
import cn from 'classnames';
import { indexOf } from 'lodash/fp';
import { TStream } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { statusTable } from 'const';
import css from './Item.module.scss';

interface StreamItemProps {
  stream: TStream;
  onCheck: (id: string) => void;
  checked: string[];
}

const statusIcon: { [key: string]: IconName } = {
  JOB_STATUS_NONE: 'offline',
  JOB_STATUS_NEW: 'offline',
  JOB_STATUS_PREPARING: 'awaitingInput',
  JOB_STATUS_PREPARED: 'awaitingInput',
  JOB_STATUS_PROCESSING: 'awaitingInput',
  JOB_STATUS_READY: 'awaitingInput',
  JOB_STATUS_COMPLETED: 'offline',
  JOB_STATUS_CANCELLED: 'offline',
  JOB_STATUS_FAILED: 'incomplete',
};

const StreamItem = ({ stream, onCheck, checked }: StreamItemProps) => {
  const { id, streamId, status } = stream;
  const handleCheck = () => onCheck(stream.id);
  const isChecked = indexOf(stream.id)(checked) >= 0;

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
          <Typography type="bodyAlt">{streamId}</Typography>
        </Link>
      </td>
    </tr>
  );
};

export default observer(StreamItem);
