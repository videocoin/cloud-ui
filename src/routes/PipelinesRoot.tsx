import React, { ReactNode, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import PipelinesStore from 'stores/pipelines';

export default ({
  children,
}: RouteComponentProps & { children: ReactNode }) => {
  useEffect(() => {
    const { load, isPending } = PipelinesStore;

    if (isPending) {
      load();
    }
  }, []);

  return <>{children}</>;
};
