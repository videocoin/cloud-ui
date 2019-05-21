import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalManager from 'components/ModalManager';

const Dashboard = lazy(() => import('routes/dashboard'));
const Pending = lazy(() => import('routes/Pending'));
const Account = lazy(() => import('routes/account'));
const Wallet = lazy(() => import('routes/wallet'));
const Terms = lazy(() => import('routes/terms'));
const SignIn = lazy(() => import('routes/signin'));
const SignUp = lazy(() => import('routes/signup'));
const Pipelines = lazy(() => import('routes/pipelines'));
const NewLivestream = lazy(() => import('routes/new-livestream'));

const App = () => {
  return (
    <>
      <Suspense fallback={<div />}>
        <Router className="wrapper" primary={false}>
          <Redirect from="/" to="/dashboard/pipelines" noThrow />
          <Dashboard path="/dashboard">
            <Pending path="pending" />
            <Account path="account" />
            <Terms path="account/terms" />
            <Wallet path="wallet" />
            <Pipelines path="pipelines" default />
            <NewLivestream path="pipelines/new-livestream" />
          </Dashboard>
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
          <Terms isCommon path="/terms" />
        </Router>
        <ModalManager />
      </Suspense>
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        closeButton={false}
      />
    </>
  );
};

export default hot(App);
