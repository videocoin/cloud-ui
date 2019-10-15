import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Streams from 'components/LiveStreams';
import StreamsHeader from 'components/LiveStreams/Header';
import { TopBar } from 'ui-kit';
import BalanceBadge from 'components/BalanceBadge';

const StreamsPage: FC<RouteComponentProps> = props => {
  return (
    <>
      <div className="topBar">
        <TopBar>
          <StreamsHeader />
        </TopBar>
      </div>
      <div className="content">
        <Streams />
        <BalanceBadge />
      </div>
    </>
  );
};

export default StreamsPage;
