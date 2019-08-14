import React, { FC, useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import css from './index.module.scss';

const pipelineRequestTimeout = 5000;
const StreamControl = observer(() => {
  const { stream } = StreamStore;

  if (!stream) return null;
  const { status, runStream, completeStream } = stream;

  switch (status) {
    case 'JOB_STATUS_NEW':
    case 'JOB_STATUS_NONE':
      return <Button onClick={runStream}>Start stream</Button>;
    case 'JOB_STATUS_PREPARING':
    case 'JOB_STATUS_PREPARED':
    case 'JOB_STATUS_PROCESSING':
      return <Button onClick={completeStream}>Cancel stream</Button>;
    case 'JOB_STATUS_READY':
      return <Button onClick={completeStream}>Complete stream</Button>;
    default:
      return <Button onClick={runStream}>Start stream</Button>;
  }
});

const LivestreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
  const {
    isStreamLoading,
    isStreamPending,
    fetchStream,
    clearStream,
  } = StreamStore;
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
  }, [clearStream, fetchStream, isStreamLoading, isStreamPending, streamId]);

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
