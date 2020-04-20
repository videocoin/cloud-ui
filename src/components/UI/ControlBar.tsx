import React, { ReactNode } from 'react';
import css from './index.module.scss';
import { CSSTransition } from 'react-transition-group';

const ControlBar = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) => (
  <CSSTransition
    classNames={{
      enter: css.enter,
      exit: css.exit,
      enterActive: css.enterActive,
      exitActive: css.exitActive,
    }}
    unmountOnExit
    timeout={150}
    in={isOpen}
  >
    <div className={css.controlBar}>{children}</div>
  </CSSTransition>
);

export default ControlBar;
