import React, { FC, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { get } from 'lodash/fp';
import { Spinner } from 'ui-kit';
import { history } from 'index';
import { RouteComponentProps } from '@reach/router';
import { confirmUser } from 'api/user';

const Confirm: FC<RouteComponentProps> = ({ location }) => {
  const handleConfirm = useCallback(async () => {
    const { token } = queryString.parse(get('search')(location));

    await confirmUser(token as string);
    history.navigate('/dashboard/streams');
  }, [location]);

  useEffect(() => {
    handleConfirm();
  }, [handleConfirm]);

  return <Spinner />;
};

export default Confirm;
