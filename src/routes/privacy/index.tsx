import { RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import Privacy from 'components/Privacy';

const PrivacyPage: FC<RouteComponentProps & { isCommon?: boolean }> = ({
  isCommon,
}) => {
  return (
    <div className={isCommon ? 'termsPage container' : ''}>
      <div className="topBar">
        <TopBar>
          <BackLink to={isCommon ? '/sign-up' : '../'} />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Privacy Policy</Typography>
          </div>
        </TopBar>
      </div>
      <div className="content">
        <Privacy />
      </div>
    </div>
  );
};

export default PrivacyPage;
