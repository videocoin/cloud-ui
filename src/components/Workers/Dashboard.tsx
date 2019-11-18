import React, { useRef, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import NewWorkersList from 'components/Workers/NewWorkers/NewWorkersList';
import WorkersStore from 'stores/workers';
import { workersRequestTimeout } from 'const';
import ControlBar from 'components/Workers/ControlBar';
import { CSSTransition } from 'react-transition-group';
import RegisteredWorkersList from 'components/Workers/RegisteredWorkers/RegisteredWorkersList';
import WorkerSetupGuide from './WorkerSetupGuide';
import css from './styles.module.scss';

const WorkersDashboard = ({
  guideVisible,
  hideGuide,
}: {
  guideVisible: boolean;
  hideGuide: () => void;
}) => {
  const { checked, fetchWorkers } = WorkersStore;
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          fetchWorkers({ silent: true });
        } finally {
          startPoll(workersRequestTimeout);
        }
      }, timeout) as unknown) as number;
    },
    [fetchWorkers],
  );

  useEffect(() => {
    startPoll(0);

    return () => {
      clearTimeout(timer.current);
    };
  }, [startPoll]);

  return (
    <>
      <WorkerSetupGuide hideGuide={hideGuide} guideVisible={guideVisible} />
      <NewWorkersList />
      <RegisteredWorkersList />
      <CSSTransition
        classNames={{
          enter: css.enter,
          exit: css.exit,
          enterActive: css.enterActive,
          exitActive: css.exitActive,
        }}
        unmountOnExit
        timeout={150}
        in={Boolean(checked.length)}
      >
        <ControlBar />
      </CSSTransition>
    </>
  );
};

export default observer(WorkersDashboard);
