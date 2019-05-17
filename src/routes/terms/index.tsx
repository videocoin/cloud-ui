import { RouteComponentProps } from '@reach/router';
import Terms from 'components/Terms';
import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';

const TermsPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar>
        <BackLink />
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">Terms and Conditions</Typography>
        </div>
      </TopBar>
      <Terms />
    </>
  );
};

export default TermsPage;
