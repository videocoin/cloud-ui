import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TopBar, Typography } from 'ui-kit';
import AccountDetails from 'components/Account';

const Account: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">Account</Typography>
        </div>
      </TopBar>
      <AccountDetails />
    </>
  );
};

export default Account;
