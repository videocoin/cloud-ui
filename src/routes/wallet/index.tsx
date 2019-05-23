import { RouteComponentProps } from '@reach/router';
import Wallet from 'components/Wallet';
import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';

const WalletPage: FC<RouteComponentProps> = () => {
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">VideoCoin Wallet</Typography>
          </div>
        </TopBar>
      </div>
      <div className="content">
        <Wallet />
      </div>
    </div>
  );
};

export default WalletPage;
