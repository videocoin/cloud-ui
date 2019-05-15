import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TopBar, Typography } from 'ui-kit';
import AccountDetails from 'components/Account';
import BackLink from 'components/BackLink';

const Account: FC<RouteComponentProps> = () => {
  return (
    <div>
      <TopBar>
        <BackLink />
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">Account</Typography>
        </div>
      </TopBar>
      <AccountDetails />
    </div>
  );
};

export default Account;
