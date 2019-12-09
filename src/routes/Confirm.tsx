import React, { FC, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { get } from 'lodash/fp';
import { Spinner } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import { confirmUser } from 'api/user';

const Confirm: FC<RouteComponentProps> = ({ location, navigate }) => {
  const handleConfirm = useCallback(async () => {
    const { token } = queryString.parse(get('search')(location));

    await confirmUser(token as string);
    navigate('/dashboard/streams');
  }, [location, navigate]);

  useEffect(() => {
    handleConfirm();
  }, [handleConfirm]);

  return <Spinner />;
};

export default Confirm;
