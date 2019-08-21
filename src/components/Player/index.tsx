import React, { useEffect, useRef } from 'react';
import { eq } from 'lodash/fp';
import { Icon, Typography } from 'ui-kit';
import { IInputStatus, IStatus } from 'stores/models/stream';
import css from './index.module.scss';

interface PlayerProps {
  src: string;
  status: IStatus;
  inputStatus: IInputStatus;
}

const Player = ({ src, status, inputStatus }: PlayerProps) => {
  const container = useRef(null);
  const player = useRef(null);

  const isOnline =
    eq(status, 'JOB_STATUS_READY') && eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const isStreamPending =
    eq(status, 'JOB_STATUS_PENDING') || eq(status, 'JOB_STATUS_PROCESSING');

  useEffect(() => {
    if (isOnline) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      player.current = window.IndigoPlayer.init(container.current, {
        sources: [
          {
            type: 'hls',
            src,
          },
        ],
      });
    }

    return () => player.current && player.current.destroy();
  }, [isOnline, src]);

  const render = () => {
    if (isOnline) {
      return <div ref={container} />;
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

export default Player;
