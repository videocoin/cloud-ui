import React, { useEffect, useRef } from 'react';
import { Icon, Typography } from 'ui-kit';
import StreamStore from 'stores/stream';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';

const Player = () => {
  const { stream } = StreamStore;
  const container = useRef(null);
  const player = useRef(null);
  const {
    isPending,
    isReady,
    outputUrl,
    isProcessing,
    isPreparing,
    isPrepared,
    isCompleted,
  } = stream;
  const isOnline = isReady || isCompleted;

  useEffect(() => {
    if (isOnline && outputUrl && container.current) {
      const isMp4 = outputUrl.split('.').pop().toLowerCase() === 'mp4';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      player.current = window.IndigoPlayer.init(container.current, {
        sources: [
          {
            type: isMp4 ? 'mp4' : 'hls',
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

  const isPreparingStream = isPending || isProcessing;
  const isPreparingInput = isPreparing || isPrepared;
  const render = () => {
    if (isOnline) {
      return <div ref={container} />;
    }
    if (isPreparingInput) {
      return (
        <div>
          <Icon name="preparing" />
          <Typography type="body">Preparing Input</Typography>
          <Typography type="caption">This may take a few minutes</Typography>
        </div>
      );
    }
    if (isPreparingStream) {
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
