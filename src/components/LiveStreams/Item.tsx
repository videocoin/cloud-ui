import React from 'react';
import { Checkbox, Icon, Typography, IconName } from 'ui-kit';
import cn from 'classnames';
import { TStream } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { statusTable } from 'const';
import css from './Item.module.scss';

interface StreamItemProps {
  stream: TStream;
  onCheck: (stream: TStream) => void;
  checked: Map<string, TStream>;
}

const statusIcon: { [key: string]: IconName } = {
  STREAM_STATUS_NONE: 'offline',
  STREAM_STATUS_NEW: 'offline',
  STREAM_STATUS_PREPARING: 'awaitingInput',
  STREAM_STATUS_PREPARED: 'awaitingInput',
  STREAM_STATUS_PROCESSING: 'awaitingInput',
  STREAM_STATUS_READY: 'awaitingInput',
  STREAM_STATUS_COMPLETED: 'offline',
  STREAM_STATUS_CANCELLED: 'offline',
  STREAM_STATUS_FAILED: 'incomplete',
  STREAM_STATUS_PENDING: 'awaitingInput',
};

const StreamItem = ({ stream, onCheck, checked }: StreamItemProps) => {
  const { id, streamContractId, status, name } = stream;
  const handleCheck = () => onCheck(stream);
  const isChecked = checked.has(stream.id);

  return (
    <tr className={cn(css.row, isChecked && css.checked)}>
      <td className={css.checkCell}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </td>
      <td className={css.statusCell}>
        <Link to={id} className={css.status}>
          <Icon name={statusIcon[status] || 'offline'} width={24} height={24} />
          <div>{statusTable[status]}</div>
        </Link>
      </td>
      <td className={css.nameCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">{streamContractId}</Typography>
        </Link>
      </td>
      <td>
        <Typography type="body">{name}</Typography>
      </td>
    </tr>
  );
};

export default observer(StreamItem);
