import React, { FC, useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import Navigation from 'components/Navigation';
import withAuth from 'HOCs/withAuth';
import UserStore from 'stores/user';
import { history } from 'index';
import { Spinner } from 'ui-kit';
import { balanceRequestTimeout } from 'const';
import billingStore from 'stores/billing';
import css from './index.module.scss';

const Dashboard: FC<RouteComponentProps & { '*'?: any }> = ({
  children,
  ...props
}) => {
  const { isActive, isLoading } = UserStore;
  const { fetchBillingProfile } = billingStore;
  const { '*': path } = props;
  const interval = useRef(null);

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        fetchBillingProfile();
      }, balanceRequestTimeout);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [fetchBillingProfile, isActive]);

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
