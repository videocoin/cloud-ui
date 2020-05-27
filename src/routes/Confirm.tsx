import React, { FC, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { get } from 'lodash/fp';
import { Spinner } from 'ui-kit';
import { history } from 'index';
import { RouteComponentProps } from '@reach/router';
import userStore from 'stores/user';

const Confirm: FC<RouteComponentProps> = ({ location }) => {
  const { confirmUser, isWorker } = userStore;
  const handleConfirm = useCallback(async () => {
    const { token } = queryString.parse(get('search')(location));
    await confirmUser(token as string);
    history.navigate(isWorker ? '/dashboard/workers' : '/dashboard/streams');
  }, [location, confirmUser, isWorker]);

  useEffect(() => {
    handleConfirm();
  }, [handleConfirm]);

  return <Spinner />;
};

export default Confirm;
