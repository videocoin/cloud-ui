import React, { FC, useState } from 'react';
import { Button, TopBar, Typography } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import BecomeWorker from 'components/Workers/BecomeWorker';
import WorkersDashboard from 'components/Workers/Dashboard';
import WorkersStore from 'stores/workers';
import UserStore from 'stores/user';
import { STORAGE_KEY } from 'const';

const WorkersPage: FC<RouteComponentProps> = () => {
  const { createWorker, isCreating } = WorkersStore;
  const { isWorker } = UserStore;
  const [isGuideVisible, setGuide] = useState(
    !localStorage.getItem(STORAGE_KEY.GUIDE_HIDDEN),
  );
  const showGuide = () => {
    setGuide(true);
    localStorage.removeItem(STORAGE_KEY.GUIDE_HIDDEN);
  };
  const hideGuide = () => {
    setGuide(false);
    localStorage.setItem(STORAGE_KEY.GUIDE_HIDDEN, 'true');
  };

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
            {isWorker && (
              <Button loading={isCreating} onClick={createWorker}>
                New Worker
              </Button>
            )}
          </div>
        </TopBar>
      </div>
      <div className="content">
        {!isWorker ? (
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
