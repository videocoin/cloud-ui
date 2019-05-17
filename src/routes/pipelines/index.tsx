import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Pipelines from 'components/Pipelines';
import BalanceBadge from 'components/BalanceBadge';
import css from './index.module.scss';

const PipelinesPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <BackLink />
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">Livestream Pipelines</Typography>
        </div>
        <div className={css.newBtn}>
          <Button>New livestream</Button>
        </div>
      </TopBar>
      <Pipelines />
      <BalanceBadge />
    </>
  );
};

export default withAuth()(PipelinesPage);
