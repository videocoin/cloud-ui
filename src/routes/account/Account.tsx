import React, { FC } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { Icon, TopBar, Typography } from 'ui-kit';
import AccountDetails from 'components/Account';
import css from './index.module.scss';

const Account: FC<RouteComponentProps> = () => {
  return (
    <div>
      <TopBar>
        <Link className={css.backLink} to="../">
          <Icon name="placeholderSm" width={24} height={24} />
        </Link>
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
