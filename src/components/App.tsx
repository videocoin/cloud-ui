import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalManager from 'components/ModalManager';
import { Spinner } from 'ui-kit';

const Dashboard = lazy(() => import('routes/dashboard'));
const Pending = lazy(() => import('routes/Pending'));
const Account = lazy(() => import('routes/account'));
const Wallet = lazy(() => import('routes/wallet'));
const Terms = lazy(() => import('routes/terms'));
const Privacy = lazy(() => import('routes/privacy'));
const SignIn = lazy(() => import('routes/signin'));
const SignUp = lazy(() => import('routes/signup'));
const PipelinesRoot = lazy(() => import('routes/PipelinesRoot'));
const Pipelines = lazy(() => import('routes/pipelines'));
const NewLivestream = lazy(() => import('routes/new-livestream'));
const Livestream = lazy(() => import('routes/livestream'));
const Shared = lazy(() => import('routes/shared'));

const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router className="wrapper" primary={false}>
          <Redirect from="/" to="/dashboard/pipelines" noThrow />
          <Dashboard path="/dashboard">
            <Pending path="pending" />
            <Account path="account" />
            <Terms path="account/terms" />
            <Privacy path="account/privacy" />
            <Wallet path="wallet" />
            <PipelinesRoot path="pipelines">
              <Pipelines path="/" />
              <NewLivestream path="new" />
              <Livestream path=":streamId" />
            </PipelinesRoot>
          </Dashboard>
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
          <Terms isCommon path="/terms" />
          <Privacy isCommon path="/privacy" />
          <Shared path="/pipelines/shared/:accessCode" />
        </Router>
      </Suspense>
      <Suspense fallback={<Spinner />}>
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
