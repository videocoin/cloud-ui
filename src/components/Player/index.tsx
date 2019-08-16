import React from 'react';
import { eq } from 'lodash/fp';
import { Icon, Typography } from 'ui-kit';
import { IInputStatus, IStatus } from 'stores/models/stream';
import css from './index.module.scss';

interface PlayerProps {
  src: string;
  format: string;
  status: IStatus;
  inputStatus: IInputStatus;
}

const Player = ({ src, format, status }: PlayerProps) => {
  const isOnline =
    eq(status, 'JOB_STATUS_READY') && eq(status, 'INPUT_STATUS_ACTIVE');
  const isStreamPending =
    eq(status, 'JOB_STATUS_PENDING') || eq(status, 'JOB_STATUS_PROCESSING');

  const render = () => {
    if (isOnline) {
      return (
        <dl8-video crossorigin="anonymous" aspect="16:9" format={format}>
          <source src={src} type="application/x-mpegurl" />
        </dl8-video>
      );
    }
    if (isStreamPending) {
      return (
        <div>
          <Icon name="preparing" />
          <Typography type="bodyAlt">Preparing Stream</Typography>
          <Typography type="caption">This may take a few minutes</Typography>
        </div>
      );
    }

    return <Typography type="bodyAlt">Stream Offline</Typography>;
  };

  return <div className={css.player}>{render()}</div>;
};

Player.defaultProps = {};

export default Player;
