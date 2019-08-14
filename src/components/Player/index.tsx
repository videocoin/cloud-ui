import React from 'react';
import { eq } from 'lodash/fp';
import { Typography } from 'ui-kit';
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

  return (
    <div className={css.player}>
      {!isOnline ? (
        <Typography type="bodyAlt">Offline</Typography>
      ) : (
        <dl8-video crossorigin="anonymous" aspect="16:9" format={format}>
          <source src={src} type="application/x-mpegurl" />
        </dl8-video>
      )}
    </div>
  );
};

Player.defaultProps = {};

export default Player;
