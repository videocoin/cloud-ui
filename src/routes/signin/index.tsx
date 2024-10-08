import React, { FC, useEffect } from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { get } from 'lodash/fp';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Typography, Card } from 'ui-kit';
import ModalStore from 'stores/modal';
import SignInForm from 'components/SignInForm';
import withAuth from 'HOCs/withAuth';
import queryString from 'query-string';
import { modalType } from 'components/ModalManager';
import Header from 'components/Header';
import UserStore from 'stores/user';
import css from './index.module.scss';
import Text from '../../components/UI/Text';

const SignIn: FC<RouteComponentProps> = ({ location }) => {
  const { token } = queryString.parse(get('search')(location));
  const isSignin = location.pathname.includes('/sign-in');
  const { openModal } = ModalStore;
  const { logout } = UserStore;

  useEffect(() => {
    if (token) {
      logout();
      openModal(modalType.RESTORE_PASSWORD, { token: String(token) });
    }
  }, [logout, openModal, token]);
  return (
    <>
      <Header isSignin={isSignin} />
      <div className="vc-container">
        <Grid fluid>
          <Row>
            <Col xsOffset={1} xs={5} className={css.left}>
              <div className="mb15">
                <Text variant="display2" color="violet20">
                  {'VideoCoin\nNetwork Console'}
                </Text>
              </div>
              <Text className={css.desc} variant="smallBody" color="violet20">
                The VideoCoin Network is an API first, decentralized video
                infrastructure designed for engineers to create cost effective
                video streaming, livestreaming, VOD applications.
              </Text>
            </Col>
            <Col xsOffset={1} xs={4}>
              <div className="mb40">
                <Card>
                  <SignInForm />
                </Card>
              </div>
              <Typography align="center">
                Don’t have an account? &nbsp;
                <Link className="link" to="/sign-up">
                  Sign Up
                </Link>
              </Typography>
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default withAuth(true)(SignIn);
