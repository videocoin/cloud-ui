import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Button, TopBar, Typography, WarnTooltip } from 'ui-kit';
import { toast } from 'react-toastify';
import { eq, getOr } from 'lodash/fp';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import UserStore from 'stores/user';
import { MIN_VID, STREAM_STATUS, defaultServerError } from 'const';
import { startWebRTC } from 'api/streams';
import css from './index.module.scss';

const streamRequestTimeout = 5000;
const StreamControl = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const { stream } = StreamStore;
  const { hasBalance } = UserStore;

  if (!stream) return null;
  const { status, runStream, completeStream } = stream;

  const handleStart = async () => {
    setLoading(true);
    try {
      await runStream();
    } catch (err) {
      toast.error(getOr(defaultServerError, 'response.data.message', err));
      setLoading(false);
      throw err;
    }
  };

  switch (status) {
    case STREAM_STATUS.STREAM_STATUS_NEW:
    case STREAM_STATUS.STREAM_STATUS_PREPARING:
    case STREAM_STATUS.STREAM_STATUS_NONE:
      return (
        <div data-tip data-for="start">
          <Button
            onClick={handleStart}
            loading={isLoading}
            disabled={!hasBalance}
          >
            Start stream
          </Button>
          {!hasBalance && (
            <WarnTooltip
              text={`Minimum balance of ${MIN_VID} VID required to start a stream`}
              id="start"
            />
          )}
        </div>
      );
    case STREAM_STATUS.STREAM_STATUS_FAILED:
    case STREAM_STATUS.STREAM_STATUS_COMPLETED:
      return null;
    case STREAM_STATUS.STREAM_STATUS_PREPARED:
    case STREAM_STATUS.STREAM_STATUS_PENDING:
    case STREAM_STATUS.STREAM_STATUS_PROCESSING:
      return (
        <Button theme="perfect-white" onClick={completeStream}>
          Cancel stream
        </Button>
      );
    case STREAM_STATUS.STREAM_STATUS_READY:
      return (
        <Button theme="violet-sky" onClick={completeStream}>
          Stop stream
        </Button>
      );
    default:
      return (
        <Button onClick={runStream} loading={isLoading}>
          Start stream
        </Button>
      );
  }
});

const LivestreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
  const { isStreamLoading, fetchStream, clearStream, stream } = StreamStore;
  const interval = useRef(null);

  const [videoDevice, setVideoDevice] = useState(null);
  const [audioDevice, setAudioDevice] = useState(null);

  const initWebRTC = useCallback(() => {
    const pc = new RTCPeerConnection();

    const constraints = {
      audio: {
        deviceId: { exact: audioDevice },
      },
      video: {
        deviceId: { exact: videoDevice },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream: any) => {
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
          pc.addTrack(track);
        });

        pc.createOffer().then(offer => {
          pc.setLocalDescription(offer);
          startWebRTC({ streamId, sdp: offer.sdp });
        });
      });
    // eslint-disable-next-line
  }, [audioDevice, videoDevice]);

  useEffect(() => {
    if (
      stream?.isWebRTC &&
      eq(stream?.status, STREAM_STATUS.STREAM_STATUS_PREPARED)
    ) {
      initWebRTC();
    }
    // eslint-disable-next-line
  }, [stream?.status]);

  const fetchData = useCallback(async () => {
    if (!isStreamLoading) {
      try {
        await fetchStream(streamId);
      } catch (e) {
        if (e.response.status === 404) {
          navigate('/not-found');
        }
      }
      interval.current = setInterval(async () => {
        fetchStream(streamId, true);
      }, streamRequestTimeout);
    }
  }, [fetchStream, isStreamLoading, streamId]);

  useEffect(() => {
    fetchData();

    return () => {
      clearStream();
      clearInterval(interval.current);
    };
  }, [clearStream, fetchData]);

  return (
    <>
      <div className="topBar">
        <TopBar>
          <BackLink />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Livestream</Typography>
          </div>
          <div className={css.btns}>
            <StreamControl />
          </div>
        </TopBar>
      </div>
      <div className="content">
        <Livestream setVideo={setVideoDevice} setAudio={setAudioDevice} />
      </div>
    </>
  );
};

export default observer(LivestreamPage);
