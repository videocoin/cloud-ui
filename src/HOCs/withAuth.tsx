import React, { ComponentType } from 'react';
import UserStore from 'stores/user';
import { observer } from 'mobx-react-lite';
import { Redirect } from '@reach/router';

export default (authRedirect = false) => (WrappedComponent: ComponentType) => {
  return observer(function withAuth(props: any) {
    const { isAuth, isLoading, isPending, fetchUser } = UserStore;
    if (isLoading) {
      return null;
    }
    if (isPending) {
      fetchUser();
      return null;
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
