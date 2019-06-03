import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livestream';
import { observer } from 'mobx-react-lite';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import css from './index.module.scss';
import PipelinesStore from '../../stores/pipelines';

const StreamControl = observer(() => {
  const { pipeline } = PipelinesStore;

  if (!pipeline) return null;
  const { status, runPipeline, cancelPipeline, completePipeline } = pipeline;

  switch (status) {
    case 'IDLE':
      return <Button onClick={runPipeline}>Start stream</Button>;
    case 'PENDING_REQUEST':
    case 'PENDING_APPROVE':
    case 'PENDING_CREATE':
      return (
        <Button onClick={cancelPipeline} disabled>
          Cancel stream
        </Button>
      );
    case 'PENDING_JOB':
      return <Button onClick={cancelPipeline}>Cancel stream</Button>;
    case 'RUNNING':
      return <Button onClick={completePipeline}>Complete stream</Button>;
    default:
      return <Button onClick={runPipeline}>Start stream</Button>;
  }
});

const LivestreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
  const { openModal } = ModalStore;
  const handleShare = () => openModal(modalType.SHARE_MODAL);

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
            <Button theme="minimal" onClick={handleShare}>
              Share
            </Button>
            <StreamControl />
          </div>
        </TopBar>
      </div>
      <div className="content">
        <Livestream streamId={streamId} />
      </div>
    </>
  );
};

export default LivestreamPage;
