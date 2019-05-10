import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from 'videocoin-ui-kit';
import withAuth from 'HOCs/withAuth';

const Dashboard: FC<RouteComponentProps> = () => {
  return <Typography>Dashboard</Typography>;
};

export default withAuth()(Dashboard);
