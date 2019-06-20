import React from 'react';
import { eq } from 'lodash/fp';
import { Typography } from 'ui-kit';
import css from './index.module.scss';

interface PlayerProps {
  src: string;
  format: string;
  status: string;
}

const Player = ({ src, format, status }: PlayerProps) => {
  const isOffline = eq('None', status) || eq('Inactive', status);

  return (
    <div className={css.player}>
      {isOffline ? (
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
