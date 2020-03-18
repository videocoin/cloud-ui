import React, { FC, useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import Navigation from 'components/Navigation';
import withAuth from 'HOCs/withAuth';
import UserStore from 'stores/user';
import { history } from 'index';
import { Spinner } from 'ui-kit';
import { balanceRequestTimeout } from 'const';
import css from './index.module.scss';

const Dashboard: FC<RouteComponentProps & { '*'?: any }> = ({
  children,
  ...props
}) => {
  const { isActive, fetchUser, isLoading } = UserStore;
  const { '*': path } = props;
  const interval = useRef(null);

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        fetchUser(true);
      }, balanceRequestTimeout);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [fetchUser, isActive]);

  if (!isActive && path !== 'pending') {
    history.navigate('/dashboard/pending');

    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={css.dashboard}>
      <div className={css.nav}>
        <Navigation />
      </div>
      <div className={css.body}>{children}</div>
    </div>
  );
};

export default withAuth()(Dashboard);
