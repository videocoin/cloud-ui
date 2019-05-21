import React, { FC } from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { Button, TopBar, Typography } from 'ui-kit';
import Pipelines from 'components/Pipelines';
import BalanceBadge from 'components/BalanceBadge';
import css from './index.module.scss';

const PipelinesPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">Livestream Pipelines</Typography>
        </div>
        <div className={css.newBtn}>
          <Link to="new-livestream">
            <Button>New livestream</Button>
          </Link>
        </div>
      </TopBar>
      <Pipelines />
      <BalanceBadge />
    </>
  );
};

export default withAuth()(PipelinesPage);
