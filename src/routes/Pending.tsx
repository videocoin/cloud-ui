import React, { FC } from 'react';
import { Typography } from 'videocoin-ui-kit';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { RouteComponentProps } from '@reach/router';
import AudienceImg from 'img/audience.svg';
import withAuth from 'HOCs/withAuth';

const Pending: FC<RouteComponentProps> = () => {
  return (
    <Grid>
      <Row>
        <Col xs={6} xsOffset={3}>
          <div className="g-tac">
            <img
              className="mb45"
              width={420}
              height={292}
              src={AudienceImg}
              alt=""
            />
            <div className="mb10">
              <Typography type="display3">You&apos;re On The List</Typography>
            </div>
            <Typography>
              In order to ensure an optimal experience, we are slowly rolling
              out access to the VideoCoin Network. You&apos;re on the waitlist
              and we&apos;ll email you when we expand the network.
            </Typography>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default withAuth()(Pending);
