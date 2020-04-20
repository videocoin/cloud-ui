import React from 'react';
import { contains } from 'lodash/fp';
import { Checkbox, Icon, Typography, IconName } from 'ui-kit';
import cn from 'classnames';
import { TStream } from 'stores/types';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { STREAM_STATUS } from 'const';
import { IStatus } from 'stores/models/stream';
import css from './Item.module.scss';
import formatDate from 'helpers/formatDate';

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
  [STREAM_STATUS.READY]: 'streaming',
  [STREAM_STATUS.COMPLETED]: 'offline',
  [STREAM_STATUS.CANCELLED]: 'offline',
  [STREAM_STATUS.DELETED]: 'offline',
  [STREAM_STATUS.FAILED]: 'incomplete',
  [STREAM_STATUS.PENDING]: 'awaitingInput',
};
const statusText: Record<IStatus, string> = {
  [STREAM_STATUS.NONE]: 'Offline',
  [STREAM_STATUS.NEW]: 'Offline',
  [STREAM_STATUS.PREPARING]: 'Preparing',
  [STREAM_STATUS.PREPARED]: 'Awaiting Input',
  [STREAM_STATUS.PROCESSING]: 'Awaiting Input',
  [STREAM_STATUS.READY]: 'Streaming',
  [STREAM_STATUS.COMPLETED]: 'Offline',
  [STREAM_STATUS.CANCELLED]: 'Offline',
  [STREAM_STATUS.DELETED]: 'Offline',
  [STREAM_STATUS.FAILED]: 'Incomplete',
  [STREAM_STATUS.PENDING]: 'Awaiting Input',
  [STREAM_STATUS.FAILED]: 'Failed',
};
const statusColor: Record<IStatus, string> = {
  [STREAM_STATUS.NONE]: 'Offline',
  [STREAM_STATUS.NEW]: 'Offline',
  [STREAM_STATUS.PREPARING]: '#FD9369',
  [STREAM_STATUS.PREPARED]: '#7130CC',
  [STREAM_STATUS.PROCESSING]: '#7130CC',
  [STREAM_STATUS.READY]: '#2CC383',
  [STREAM_STATUS.COMPLETED]: 'Offline',
  [STREAM_STATUS.CANCELLED]: 'Offline',
  [STREAM_STATUS.DELETED]: 'Offline',
  [STREAM_STATUS.FAILED]: 'Incomplete',
  [STREAM_STATUS.PENDING]: '#7130CC',
  [STREAM_STATUS.FAILED]: '#F53568',
};
const StreamItem = ({ stream, onCheck, checked }: StreamItemProps) => {
  const { id, streamContractId, createdAt, totalCost, status, name } = stream;
  const handleCheck = () => onCheck(stream);
  const isChecked = checked.has(stream.id);
  const canBeDeleted = contains(status)([
    STREAM_STATUS.NEW,
    STREAM_STATUS.FAILED,
    STREAM_STATUS.COMPLETED,
    STREAM_STATUS.CANCELLED,
    STREAM_STATUS.DELETED,
  ]);
  const disabled = contains(status)([
    STREAM_STATUS.CANCELLED,
    STREAM_STATUS.DELETED,
  ]);

  return (
    <tr
      className={cn(css.row, {
        [css.checked]: isChecked,
        [css.disabled]: disabled,
      })}
    >
      <td className={css.checkCell}>
        {canBeDeleted && (
          <Checkbox checked={isChecked} onChange={handleCheck} />
        )}
      </td>
      <td className={css.statusCell}>
        <Link to={id} className={css.status}>
          <Icon
            name={statusIcon[status] || 'offline'}
            color={statusColor[status]}
            width={24}
            height={24}
          />
          <div>{statusText[status]}</div>
        </Link>
      </td>
      <td className={css.idCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">{streamContractId}</Typography>
        </Link>
      </td>
      <td className={css.nameCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">{name}</Typography>
        </Link>
      </td>
      <td className={css.idCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">
            {formatDate('MM/dd/yyyy')(createdAt)}
          </Typography>
        </Link>
      </td>
      <td className={css.idCell}>
        <Link className={css.link} to={id}>
          <Typography type="body">${totalCost}</Typography>
        </Link>
      </td>
    </tr>
  );
};

export default observer(StreamItem);
