import React, { FC } from 'react';
import {
  globalHistory as history,
  Link,
  RouteComponentProps,
} from '@reach/router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Typography } from 'ui-kit';
import SignUpForm from 'components/SignUpForm';
import withAuth from 'HOCs/withAuth';
import Header from 'components/Header';
import css from './index.module.scss';
import developersImg from './assets/developers.svg';
import workerImg from './assets/workers.svg';

const SignUp: FC<RouteComponentProps> = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  const role = urlParams.get('role');
  const isMiner = role === 'miner';
  const img = isMiner ? workerImg : developersImg;
  return (
    <>
      <Header />
      <div className="vc-container">
        <Grid fluid>
          <Row>
            <Col xsOffset={1} xs={5} className={css.left}>
              <div className="mb15">
                <img src={img} alt="" />
              </div>
              <div className="mb15">
                <Typography type="display3">
                  {isMiner
                    ? 'Operate a Worker Node'
                    : 'Video is Hard,\n We Make It Easy'}
                </Typography>
              </div>
              <Typography>
                {isMiner
                  ? 'Transform your wasted potential into cash by performing tasks on the VideoCoin Network. Just install our proprietary software on your machine and watch the magic happen.'
                  : 'The VideoCoin Network is an API first, decentralized video infrastructure designed for engineers to create cost effective video streaming, livestreaming, VOD applications.'}
              </Typography>
            </Col>
            <Col xsOffset={1} xs={4}>
              <div className="mb40">
                <SignUpForm />
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
        <div className={css.pad} />
      </div>
    </>
  );
};

export default withAuth(true)(SignUp);
