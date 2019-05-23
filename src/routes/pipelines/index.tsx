import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { TopBar } from 'ui-kit';
import Pipelines from 'components/Pipelines';
import PipelinesHeader from 'components/Pipelines/Header';
import BalanceBadge from 'components/BalanceBadge';

const PipelinesPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <div className="topBar">
        <TopBar>
          <PipelinesHeader />
        </TopBar>
      </div>
      <div className="content">
        <Pipelines />
        <BalanceBadge />
      </div>
    </>
  );
};

export default withAuth()(PipelinesPage);
