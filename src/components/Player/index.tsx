import React, { useEffect, useRef } from 'react';
import { Icon, Typography } from 'ui-kit';
import StreamStore from 'stores/stream';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';

const Player = (props: any, ref: any) => {
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
    isWebRTC,
  } = stream;
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

  const isPreparingStream = isPending || isProcessing;
  const isPreparingInput = isPreparing || isPrepared;
  const render = () => {
    if (isWebRTC && isOnline) {
      return <video muted ref={ref} />;
    }
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

export default observer(Player, { forwardRef: true });
