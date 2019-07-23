import React, { FC, useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import PipelinesStore from 'stores/pipelines';
import css from './index.module.scss';

const pipelineRequestTimeout = 5000;
const StreamControl = observer(() => {
  const { stream } = PipelinesStore;

  if (!stream) return null;
  const { status, runStream, cancelStream, completeStream } = stream;

  switch (status) {
    case 'JOB_STATUS_NONE':
      return <Button onClick={runStream}>Start stream</Button>;
    case 'JOB_STATUS_NEW':
      return (
        <Button onClick={cancelStream} disabled>
          Cancel stream
        </Button>
      );
    case 'JOB_STATUS_PENDING':
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
  const { isStreamLoading, isStreamPending } = PipelinesStore;
  const interval = useRef(null);

  useEffect(() => {
    const { fetchStream, clearStream } = PipelinesStore;

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
  }, [isStreamLoading, isStreamPending, streamId]);

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
