import React, { FC } from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Typography, Card } from 'ui-kit';
import SignUpForm from 'components/SignUpForm';
import withAuth from 'HOCs/withAuth';
import css from './index.module.scss';
import Header from '../../components/Header';

const SignUp: FC<RouteComponentProps> = () => {
  return (
    <>
      <Header />
      <div className="vc-container">
        <Grid fluid>
          <Row>
            <Col xsOffset={1} xs={5} className={css.left}>
              <div className="mb15">
                <Typography type="display2">
                  Try our new Publisher Studio
                </Typography>
              </div>
              <Typography>
                VideoCoin is decentralized video encoding, storage &
                distribution. The Airbnb of video.
              </Typography>
            </Col>
            <Col xsOffset={1} xs={4}>
              <div className="mb40">
                <Card>
                  <SignUpForm />
                </Card>
              </div>
              <Typography align="center">
                Already have an account? &nbsp;
                <Link className="link" to="/sign-in">
                  Login
                </Link>
              </Typography>
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default withAuth(true)(SignUp);
