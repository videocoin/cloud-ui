import React from 'react';
import { eq, contains } from 'lodash/fp';
import { Checkbox, Icon, Typography, IconName } from 'ui-kit';
import cn from 'classnames';
import { TStream } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { statusTable, STREAM_STATUS } from 'const';
import { IStatus } from 'stores/models/stream';
import css from './Item.module.scss';

interface StreamItemProps {
  stream: TStream;
  onCheck: (stream: TStream) => void;
  checked: Map<string, TStream>;
}

const statusIcon: Record<IStatus, IconName> = {
  [STREAM_STATUS.NONE]: 'offline',
  [STREAM_STATUS.NEW]: 'offline',
  [STREAM_STATUS.PREPARING]: 'awaitingInput',
  [STREAM_STATUS.PREPARED]: 'awaitingInput',
  [STREAM_STATUS.PROCESSING]: 'awaitingInput',
  [STREAM_STATUS.READY]: 'awaitingInput',
  [STREAM_STATUS.COMPLETED]: 'offline',
  [STREAM_STATUS.CANCELLED]: 'offline',
  [STREAM_STATUS.DELETED]: 'offline',
  [STREAM_STATUS.FAILED]: 'incomplete',
  [STREAM_STATUS.PENDING]: 'awaitingInput',
};

const StreamItem = ({ stream, onCheck, checked }: StreamItemProps) => {
  const { id, streamContractId, status, name } = stream;
  const handleCheck = () => onCheck(stream);
  const isChecked = checked.has(stream.id);
  const canBeDeleted = contains(status)([
    STREAM_STATUS.NEW,
    STREAM_STATUS.FAILED,
    STREAM_STATUS.COMPLETED,
    STREAM_STATUS.CANCELLED,
  ]);
  const cancelled = eq(STREAM_STATUS.CANCELLED, status);

  return (
    <tr
      className={cn(css.row, {
        [css.checked]: isChecked,
        [css.cancelled]: cancelled,
      })}
    >
      <td className={css.checkCell}>
        {canBeDeleted && (
          <Checkbox checked={isChecked} onChange={handleCheck} />
        )}
      </td>
      <td className={css.nameCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">{name}</Typography>
        </Link>
      </td>
      <td className={css.idCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">{streamContractId}</Typography>
        </Link>
      </td>
      <td className={css.statusCell}>
        <Link to={id} className={css.status}>
          <Icon name={statusIcon[status] || 'offline'} width={24} height={24} />
          <div>{statusTable[status]}</div>
        </Link>
      </td>
    </tr>
  );
};

export default observer(StreamItem);
