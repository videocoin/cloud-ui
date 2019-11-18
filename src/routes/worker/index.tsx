import React, { FC } from 'react';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import { RouteComponentProps } from '@reach/router';

const Worker: FC<RouteComponentProps> = () => {
  return (
    <>
      <div className="topBar">
        <div>
          <TopBar>
            <BackLink />
            <div>
              <Typography type="caption">VideoCoin Network</Typography>
              <Typography type="smallTitle">Worker</Typography>
            </div>
            <div className="mla">
              <Button>Save changes</Button>
            </div>
          </TopBar>
        </div>
      </div>
    </>
  );
};

export default Worker;
