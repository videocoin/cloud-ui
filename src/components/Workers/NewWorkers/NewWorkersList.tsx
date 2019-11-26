import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Typography } from 'ui-kit';
import WorkersStore from 'stores/workers';
import anime from 'animejs';
import isEven from 'helpers/isEven';
import { Spinner } from 'ui-kit/src/components/Spinner/Spinner';
import NewWorkerRow from './NewWorkerRow';
import css from './styles.module.scss';

const NewWorkersList = () => {
  const {
    unsetLoaded,
    isDeleting,
    isLoading,
    isLoaded,
    newWorkers,
  } = WorkersStore;

  useEffect(() => {
    return () => {
      unsetLoaded();
    };
  });

  const enableAnimate = !isDeleting && isLoaded;

  if (!newWorkers.length) return null;

  return (
    <div>
      <div className={css.title}>
        <Typography type="subtitleCaps">Needs setup</Typography>
      </div>
      {isLoading ? (
        <Spinner type="inline" />
      ) : (
        <TransitionGroup>
          {newWorkers.map((worker: any, idx) => (
            <Transition
              key={worker.id}
              unmountOnExit
              appear
              in
              timeout={650}
              addEndListener={(node, done) => {
                const tl = anime.timeline({
                  easing: 'linear',
                  duration: 650,
                });

                tl.add({
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: enableAnimate
                    ? '#7234c8'
                    : isEven(idx)
                    ? '#281741'
                    : '#1b0d2f',
                  targets: node,
                  height: [0, 64],
                  duration: enableAnimate ? 150 : 0,
                  scale: 1.05,
                });
                tl.add({
                  scale: 1,
                  targets: node,
                  opacity: 1,
                  duration: enableAnimate ? 250 : 0,
                });
                tl.add({
                  delay: 400,
                  targets: node,
                  backgroundColor: !isEven(idx) ? '#1b0d2f' : '#281741',
                  duration: enableAnimate ? 250 : 0,
                  complete: () => {
                    done();
                    node.style.backgroundColor = '';
                  },
                });
              }}
            >
              <NewWorkerRow {...worker} />
            </Transition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default observer(NewWorkersList);
