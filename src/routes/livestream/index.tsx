import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Livestream from 'components/Livesream';
import css from './index.module.scss';

const LivestreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
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
            <Button theme="minimal">Share</Button>
            <Button>Start stream</Button>
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
