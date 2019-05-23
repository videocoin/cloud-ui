import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TopBar, Typography } from 'ui-kit';
import AccountDetails from 'components/Account';

const Account: FC<RouteComponentProps> = () => {
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Account</Typography>
          </div>
        </TopBar>
      </div>
      <div className="content">
        <AccountDetails />
      </div>
    </div>
  );
};

export default Account;
