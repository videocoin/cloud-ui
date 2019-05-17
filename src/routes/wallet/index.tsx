import { RouteComponentProps } from '@reach/router';
import Wallet from 'components/Wallet';
import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';

const WalletPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <BackLink />
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
