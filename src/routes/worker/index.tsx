import React, { FC, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { eq, get, getOr } from 'lodash/fp';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import { RouteComponentProps } from '@reach/router';
import { history } from 'index';
import HttpStatus from 'http-status-codes';
import Worker from 'components/Worker';
import WorkersStore from 'stores/workers';
import Payments from 'components/Worker/Payments';

const WorkerPage: FC<RouteComponentProps & { workerId?: string }> = ({
  workerId,
}) => {
  const { clearWorker, fetchWorker, isSaving, worker } = WorkersStore;
  const load = useCallback(async () => {
    try {
      await fetchWorker(workerId);
    } catch (e) {
      if (eq(HttpStatus.NOT_FOUND, get('response.status')(e))) {
        history.navigate('/not-found');
      }
    }
  }, [fetchWorker, workerId]);

  useEffect(() => {
    load();

    return () => {
      clearWorker();
    };
  }, [clearWorker, fetchWorker, load, workerId]);

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
        <Typography type="subtitle">Payments</Typography>
        <Payments />
      </div>
    </div>
  );
};

export default observer(WorkerPage);
