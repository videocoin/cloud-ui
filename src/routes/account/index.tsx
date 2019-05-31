import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography } from 'ui-kit';
import AccountDetails from 'components/Account';
import UserStore from '../../stores/user';

const Account: FC<RouteComponentProps> = () => {
  const { logout } = UserStore;

  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div className="mra">
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Account</Typography>
          </div>
          <Button theme="minimal" onClick={logout}>
            Sign out
          </Button>
        </TopBar>
      </div>
      <div className="content">
        <AccountDetails />
      </div>
    </div>
  );
};

export default Account;
