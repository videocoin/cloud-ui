import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import Earnings from 'components/Earnings';

const EarningsPage: FC<RouteComponentProps> = () => {
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Earnings</Typography>
          </div>
        </TopBar>
      </div>
      <div className="content">
        <Earnings />
      </div>
    </div>
  );
};

export default EarningsPage;
