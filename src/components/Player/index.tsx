import React, { useEffect, useRef } from 'react';
import { Icon, Typography } from 'ui-kit';
import StreamStore from 'stores/stream';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';

const Player = () => {
  const { stream } = StreamStore;
  const container = useRef(null);
  const player = useRef(null);
  const { isPending, isReady, outputUrl, isProcessing, isCompleted } = stream;
  const isOnline = isReady || isCompleted;

  useEffect(() => {
    if (isOnline && outputUrl) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      player.current = window.IndigoPlayer.init(container.current, {
        sources: [
          {
            type: 'hls',
            src: outputUrl,
          },
        ],
      });
    }
  }, [isOnline, outputUrl]);

  useEffect(() => {
    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, []);

  const isWaitingOutput = isPending || isProcessing;

  const render = () => {
    if (isOnline) {
      return <div ref={container} />;
    }
    if (isWaitingOutput) {
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

export default observer(Player);
