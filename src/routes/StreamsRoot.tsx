import React, { ReactNode, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import StreamsStore from 'stores/streams';

export default ({
  children,
}: RouteComponentProps & { children: ReactNode }) => {
  useEffect(() => {
    const { load, isPending } = StreamsStore;

    if (isPending) {
      load();
    }
  }, []);

  return <>{children}</>;
};
