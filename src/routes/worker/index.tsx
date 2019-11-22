import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getOr } from 'lodash/fp';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import { RouteComponentProps } from '@reach/router';
import Worker from 'components/Worker';
import WorkersStore from 'stores/workers';

const WorkerPage: FC<RouteComponentProps & { workerId?: string }> = ({
  workerId,
}) => {
  const { clearWorker, fetchWorker, isSaving, worker } = WorkersStore;

  useEffect(() => {
    fetchWorker(workerId);

    return () => {
      clearWorker();
    };
  }, [clearWorker, fetchWorker, workerId]);

  return (
    <div>
      <div className="topBar">
        <div>
          <TopBar>
            <BackLink />
            <div>
              <Typography type="caption">VideoCoin Network</Typography>
              <Typography type="smallTitle">
                {getOr('Worker', 'name', worker)}
              </Typography>
            </div>
            <div className="mla">
              <Button type="submit" form="workerForm" loading={isSaving}>
                Save changes
              </Button>
            </div>
          </TopBar>
        </div>
      </div>
      <div className="content">
        <Worker />
      </div>
    </div>
  );
};

export default observer(WorkerPage);
