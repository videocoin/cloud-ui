import React, { FC } from 'react';
import { TopBar, Typography } from 'ui-kit';
import { Row, Col } from 'react-flexbox-grid';
import { Redirect, RouteComponentProps } from '@reach/router';
import AudienceImg from 'img/audience.svg';
import UserStore from 'stores/user';

const Pending: FC<RouteComponentProps> = () => {
  const { isActive } = UserStore;

  if (isActive) {
    return <Redirect to="/dashboard/streams" noThrow />;
  }

  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Waitlist</Typography>
          </div>
        </TopBar>
      </div>
      <div className="content">
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
      </div>
    </div>
  );
};

export default Pending;
