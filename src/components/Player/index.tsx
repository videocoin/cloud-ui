import React, { useEffect, useRef } from 'react';
import { eq } from 'lodash/fp';
import { Icon, Typography } from 'ui-kit';
import { IInputStatus, IStatus } from 'stores/models/stream';
import { STREAM_STATUS } from 'const';
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
    eq(status, STREAM_STATUS.STREAM_STATUS_READY) &&
    eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const isStreamPending =
    eq(status, STREAM_STATUS.STREAM_STATUS_PENDING) ||
    eq(status, STREAM_STATUS.STREAM_STATUS_PROCESSING);

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
  }, [isOnline, src]);

  useEffect(() => {
    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, []);

  const render = () => {
    if (isOnline) {
      return <div ref={container} />;
    }
    if (isStreamPending) {
      return (
        <div>
          <Icon name="preparing" />
          <Typography type="body">Preparing Stream</Typography>
          <Typography type="caption">This may take a few minutes</Typography>
        </div>
      );
    }

    return <Typography type="body">Stream Offline</Typography>;
  };

  return <div className={css.player}>{render()}</div>;
};

export default Player;
