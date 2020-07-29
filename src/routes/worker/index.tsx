import React, { FC, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { eq, get, getOr } from 'lodash/fp';
import { Button, TopBar, Typography, WarnTooltip } from 'ui-kit';
import BackLink from 'components/BackLink';
import { RouteComponentProps } from '@reach/router';
import { history } from 'index';
import HttpStatus from 'http-status-codes';
import Worker from 'components/Worker';
import WorkersStore from 'stores/workers';
import Payments from 'components/Worker/Payments';
import validationSchema from 'components/Worker/validationSchema';
import { Formik } from 'formik';

const WorkerPage: FC<RouteComponentProps & { workerId?: string }> = ({
  workerId,
}) => {
  const {
    clearWorker,
    fetchWorker,
    isSaving,
    worker,
    updateWorker,
  } = WorkersStore;
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
  const {
    name,
    allowThirdpartyDelegates,
    orgDesc,
    orgEmail,
    orgName,
    delegatePolicy,
  } = worker || {};
  const initialValues = {
    name,
    allowThirdpartyDelegates,
    orgDesc,
    orgEmail,
    orgName,
    delegatePolicy,
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={updateWorker}
    >
      {({ isValid }) => (
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
                  <div data-tip data-for="start">
                    {!isValid && (
                      <WarnTooltip
                        place="left"
                        text="Third party delegates requires contact email, description, and payout policy all be filled in."
                        id="start"
                      />
                    )}
                    <Button
                      type="submit"
                      form="workerForm"
                      loading={isSaving}
                      disabled={!isValid}
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </TopBar>
            </div>
          </div>
          <div className="content">
            <Worker />
            <Payments />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default observer(WorkerPage);
