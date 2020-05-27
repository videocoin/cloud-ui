import React, { ComponentType } from 'react';
import UserStore from 'stores/user';
import { observer } from 'mobx-react-lite';
import { Redirect } from '@reach/router';
import queryString from 'query-string';
import { get } from 'lodash/fp';
import { Spinner } from 'ui-kit';

export default (authRedirect = false) => (WrappedComponent: ComponentType) => {
  return observer(function withAuth(props: any) {
    const { isAuth, isLoading, isWorker } = UserStore;

    if (isLoading) {
      return <Spinner />;
    }

    if (authRedirect) {
      const { token } = queryString.parse(get('search')(window.location));

      return isAuth && !token ? (
        <Redirect
          to={isWorker ? '/dashboard/workers' : '/dashboard/streams'}
          noThrow
        />
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
