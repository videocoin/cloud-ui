import React from 'react';
import { observer } from 'mobx-react-lite';
import NewWorkersList from 'components/Workers/NewWorkers/NewWorkersList';
import WorkersStore from 'stores/workers';
import ControlBar from 'components/Workers/ControlBar';
import RegisteredWorkersList from 'components/Workers/RegisteredWorkers/RegisteredWorkersList';
import usePolling from 'hooks/usePolling';
import WorkerSetupGuide from './WorkerSetupGuide';

const WorkersDashboard = ({
  guideVisible,
  hideGuide,
}: {
  guideVisible: boolean;
  hideGuide: () => void;
}) => {
  const { fetchWorkers } = WorkersStore;

  usePolling(fetchWorkers);

  return (
    <>
      <WorkerSetupGuide hideGuide={hideGuide} guideVisible={guideVisible} />
      <NewWorkersList />
      <RegisteredWorkersList />
      <ControlBar />
    </>
  );
};

export default observer(WorkersDashboard);
