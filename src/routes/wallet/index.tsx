import { RouteComponentProps } from '@reach/router';
import Wallet from 'components/Wallet';
import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';

const WalletPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">VideoCoin Wallet</Typography>
        </div>
      </TopBar>
      <Wallet />
    </>
  );
};

export default WalletPage;
