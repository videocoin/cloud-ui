import React, { ComponentType } from 'react';
import UserStore from 'models/User';
import { observer } from 'mobx-react-lite';
import { Redirect } from '@reach/router';

export default (authRedirect = false) => (WrappedComponent: ComponentType) => {
  return observer(function withAuth(props: any) {
    const { isAuth, isLoading, isActive, isPending, fetchUser } = UserStore;
    if (isPending) {
      fetchUser();
      return null;
    }
    if (isLoading) {
      return null;
    }

    if (isAuth && !isActive && props.path !== '/pending') {
      return <Redirect to="/pending" noThrow />;
    }

    if (authRedirect) {
      return isAuth ? (
        <Redirect to="/dashboard" noThrow />
      ) : (
        <WrappedComponent {...props} />
      );
    }

    return isAuth ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect to="/sign-in" noThrow />
    );
  });
};
