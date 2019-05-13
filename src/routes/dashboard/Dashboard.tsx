import React, { FC } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import Navigation from 'components/Navigation';
import withAuth from 'HOCs/withAuth';
import UserStore from 'stores/user';
import css from './index.module.scss';

const Dashboard: FC<RouteComponentProps & { '*'?: any }> = ({
  children,
  ...props
}) => {
  const { isActive } = UserStore;
  const { '*': path } = props;
  if (!isActive && path !== 'pending') {
    navigate('/dashboard/pending');
    return null;
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
