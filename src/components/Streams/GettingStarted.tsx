import React from 'react';
import { Icon, Typography } from 'ui-kit';
import { observer } from 'mobx-react-lite';
import StreamsStore from 'stores/streams';
import icon from './assets/started.svg';
import css from './GettingStarted.module.scss';

const GettingStarted = () => {
  const { streams, isLoaded } = StreamsStore;

  if (streams.length > 2 || !isLoaded) {
    return null;
  }

  return (
    <div className={css.root}>
      <div className={css.icon}>
        <img src={icon} alt="" />
      </div>
      <div className={css.desc}>
        <Typography type="display3">Getting Started</Typography>
        <Typography>
          We’ve funded your account with enough credit to test out the network
          and listed out a few things to try out below. You can learn more about
          our API in our{' '}
          <a
            href="https://docs.videocoin.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            developer docs
          </a>
          .
        </Typography>
        <ul className={css.steps}>
          <li>
            <Icon color="#EEE3FF" name="videoPlay" height={24} width={24} />
            <Typography type="caption">
              Create your first stream and transcode a video file{' '}
              <a
                href="https://medium.com/videocoin/demo-setting-up-a-videocoin-worker-on-raspberry-pi-3-b-50958ca5d3e"
                target="_blank"
                rel="noopener noreferrer"
              >
                using the console
              </a>{' '}
              or{' '}
              <a
                href="https://docs.videocoin.network/developers/vod-stream"
                target="_blank"
                rel="noopener noreferrer"
              >
                using the api
              </a>
            </Typography>
          </li>
          <li>
            <Icon
              color="#EEE3FF"
              name="livestreamManager"
              height={24}
              width={24}
            />
            <Typography type="caption">
              Livestream via WebRTC{' '}
              <a
                href="https://medium.com/videocoin/videocoin-webrtc-2b4ec0fa371e"
                target="_blank"
                rel="noopener noreferrer"
              >
                using the console
              </a>{' '}
              or{' '}
              <a
                href="https://docs.videocoin.network/developers/live-stream-over-webrtc"
                target="_blank"
                rel="noopener noreferrer"
              >
                using the api
              </a>
            </Typography>
          </li>
          <li>
            <Icon color="#EEE3FF" name="billing" height={24} width={24} />
            <Typography type="caption">
              Fund your account with more credits{' '}
              <a href="#">using the console</a>
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(GettingStarted);
