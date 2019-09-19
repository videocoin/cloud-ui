import React, { FC, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gt, lt } from 'lodash/fp';
import { Button, TopBar, Typography, WarnTooltip } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import UserStore from 'stores/user';
import { MAX_VID, MIN_VID } from 'const';
import css from './index.module.scss';

const streamRequestTimeout = 5000;
const StreamControl = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const { stream } = StreamStore;
  const { balance } = UserStore;

  if (!stream) return null;
  const { status, runStream, completeStream } = stream;

  const handleStart = () => {
    setLoading(true);
    runStream();
  };

  const isMaxBalance = gt(balance)(MAX_VID);
  const isMinBalance = lt(balance)(MIN_VID);

  switch (status) {
    case 'STREAM_STATUS_NEW':
    case 'STREAM_STATUS_NONE':
      return (
        <div data-tip data-for="start">
          <Button
            onClick={handleStart}
            loading={isLoading}
            disabled={isMaxBalance || isMinBalance}
          >
            Start stream
          </Button>
          {isMinBalance && (
            <WarnTooltip
              text={`Minimum balance of ${MIN_VID} VID required to start a stream`}
              id="start"
            />
          )}
          {isMaxBalance && (
            <WarnTooltip
              text={`Withdraw VID to stream, max balance limited to ${MAX_VID} VID (for this release)`}
              id="start"
            />
          )}
        </div>
      );
    case 'STREAM_STATUS_COMPLETED':
      return null;
    case 'STREAM_STATUS_PREPARING':
    case 'STREAM_STATUS_PREPARED':
    case 'STREAM_STATUS_PENDING':
    case 'STREAM_STATUS_PROCESSING':
      return (
        <Button theme="perfect-white" onClick={completeStream}>
          Cancel stream
        </Button>
      );
    case 'STREAM_STATUS_READY':
      return (
        <Button theme="violet-sky" onClick={completeStream}>
          Stop stream
        </Button>
      );
    default:
      return <Button onClick={runStream}>Start stream</Button>;
  }
});

const LivestreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
  const { isStreamLoading, fetchStream, clearStream } = StreamStore;
  const interval = useRef(null);

  useEffect(() => {
    if (!isStreamLoading) {
      fetchStream(streamId);
      interval.current = setInterval(() => {
        fetchStream(streamId, true);
      }, streamRequestTimeout);
    }

    return () => {
      clearStream();
      clearInterval(interval.current);
    };
  }, [clearStream, fetchStream, isStreamLoading, streamId]);

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
        <Livestream />
      </div>
    </>
  );
};

export default observer(LivestreamPage);
