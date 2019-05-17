import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router } from '@reach/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalManager from 'components/ModalManager';

const Dashboard = lazy(() => import('routes/dashboard'));
const DashHome = lazy(() => import('routes/DashHome'));
const Pending = lazy(() => import('routes/Pending'));
const Account = lazy(() => import('routes/account'));
const Wallet = lazy(() => import('routes/wallet'));
const Terms = lazy(() => import('routes/terms'));
const SignIn = lazy(() => import('routes/signin'));
const SignUp = lazy(() => import('routes/signup'));
const Pipelines = lazy(() => import('routes/pipelines'));

const App = () => {
  return (
    <>
      <Suspense fallback={<div />}>
        <Router className="wrapper" primary={false}>
          <Redirect from="/" to="/dashboard" noThrow />
          <Dashboard path="/dashboard">
            <DashHome path="/" />
            <Pending path="pending" />
            <Account path="account" />
            <Terms path="account/terms" />
            <Wallet path="wallet" />
            <Pipelines path="pipelines" />
          </Dashboard>
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
        </Router>
        <ModalManager />
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default hot(App);
