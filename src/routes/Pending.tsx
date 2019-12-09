import React, { FC, useState } from 'react';
import { Button, TopBar, Typography } from 'ui-kit';
import { Row, Col } from 'react-flexbox-grid';
import { Redirect, RouteComponentProps } from '@reach/router';
import AwaitingImg from 'img/awaiting.svg';
import UserStore from 'stores/user';
import { resendConfirm } from 'api/user';

const Pending: FC<RouteComponentProps> = () => {
  const { isActive, logout, user } = UserStore;
  const [isLoading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await resendConfirm();
    } finally {
      setLoading(false);
    }
  };

  if (isActive) {
    return <Redirect to="/dashboard/streams" noThrow />;
  }

  return (
    <div>
      <div className="topBar mb45">
        <TopBar>
          <div className="mra">
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Waitlist</Typography>
          </div>
          <Button theme="minimal" onClick={logout}>
            Sign out
          </Button>
        </TopBar>
      </div>
      <div className="content">
        <Row>
          <Col xs={8} xsOffset={2}>
            <div className="g-tac">
              <img
                className="mb45"
                width={380}
                height={248}
                src={AwaitingImg}
                alt=""
              />
              <div className="mb10">
                <Typography type="display3">
                  Awaiting Email Confirmation
                </Typography>
              </div>
              <Typography>
                We’ve sent a verification email to <b>({user.email})</b>.
                <br />
                Click the link in the email to confirm your email.
              </Typography>
              <Button onClick={handleResend} theme="minimal-sunkissed">
                Send again
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Pending;
