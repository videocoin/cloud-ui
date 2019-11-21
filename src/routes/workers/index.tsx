import React, { FC, useState } from 'react';
import { eq } from 'lodash/fp';
import { Button, TopBar, Typography } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import BecomeWorker from 'components/Workers/BecomeWorker';
import WorkersDashboard from 'components/Workers/Dashboard';
import WorkersStore from 'stores/workers';
import UserStore from 'stores/user';

const WorkersPage: FC<RouteComponentProps> = () => {
  const { createWorker, isCreating } = WorkersStore;
  const { user } = UserStore;
  const [isGuideVisible, setGuide] = useState(true);
  const showGuide = () => setGuide(true);
  const hideGuide = () => setGuide(false);
  const isRegular = eq(user.role, 'USER_ROLE_REGULAR');

  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Workers</Typography>
          </div>
          <div className="mla">
            {!isGuideVisible && (
              <Button theme="minimal" onClick={showGuide}>
                Show Guides
              </Button>
            )}
            <Button loading={isCreating} onClick={createWorker}>
              New Worker
            </Button>
          </div>
        </TopBar>
      </div>
      <div className="content">
        {isRegular ? (
          <BecomeWorker />
        ) : (
          <WorkersDashboard
            guideVisible={isGuideVisible}
            hideGuide={hideGuide}
          />
        )}
      </div>
    </div>
  );
};

export default WorkersPage;
