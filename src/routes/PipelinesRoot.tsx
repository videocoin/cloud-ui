import React, { ReactNode } from 'react';
import { RouteComponentProps } from '@reach/router';

export default ({
  children,
}: RouteComponentProps & { children: ReactNode }) => <>{children}</>;
