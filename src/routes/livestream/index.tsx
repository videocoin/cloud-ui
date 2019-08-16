import React, { FC, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import css from './index.module.scss';

const pipelineRequestTimeout = 5000;
const StreamControl = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const { stream } = StreamStore;

  if (!stream) return null;
  const { status, runStream, completeStream } = stream;

  const handleStart = () => {
    setLoading(true);
    runStream();
  };

  switch (status) {
    case 'JOB_STATUS_NEW':
    case 'JOB_STATUS_NONE':
      return (
        <Button onClick={handleStart} loading={isLoading}>
          Start stream
        </Button>
      );
    case 'JOB_STATUS_COMPLETED':
      return null;
    case 'JOB_STATUS_PREPARING':
    case 'JOB_STATUS_PREPARED':
    case 'JOB_STATUS_PENDING':
    case 'JOB_STATUS_PROCESSING':
      return (
        <Button theme="perfect-white" onClick={completeStream}>
          Cancel stream
        </Button>
      );
    case 'JOB_STATUS_READY':
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
      }, pipelineRequestTimeout);
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
