import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalManager from 'components/ModalManager';
import { Spinner } from 'ui-kit';
import NotFound from 'routes/NotFound';

const Dashboard = lazy(() => import('routes/dashboard'));
const Pending = lazy(() => import('routes/Pending'));
const Account = lazy(() => import('routes/account'));
const Wallet = lazy(() => import('routes/wallet'));
const Terms = lazy(() => import('routes/terms'));
const Privacy = lazy(() => import('routes/privacy'));
const SignIn = lazy(() => import('routes/signin'));
const SignUp = lazy(() => import('routes/signup'));
const StreamsRoot = lazy(() => import('routes/StreamsRoot'));
const Streams = lazy(() => import('routes/streams'));
const NewStream = lazy(() => import('routes/new-stream'));
const Stream = lazy(() => import('routes/stream'));
const Shared = lazy(() => import('routes/shared'));
const Workers = lazy(() => import('routes/workers'));
const Worker = lazy(() => import('routes/worker'));
const Confirm = lazy(() => import('routes/Confirm'));

const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router className="wrapper" primary={false}>
          <Redirect from="/" to="/dashboard/streams" noThrow />
          <Dashboard path="/dashboard">
            <Pending path="pending" />
            <Account path="account" />
            <Terms path="account/terms" />
            <Privacy path="account/privacy" />
            <Wallet path="wallet" />
            <StreamsRoot path="streams">
              <Streams path="/" />
              <Stream path=":streamId" />
              <NewStream path="new" />
            </StreamsRoot>
            <Workers path="workers" />
            <Worker path="workers/:workerId" />
            <Redirect default from="*" to="/not-found" noThrow />
          </Dashboard>
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
          <Confirm path="/confirm" />
          <Terms isCommon path="/terms" />
          <Privacy isCommon path="/privacy" />
          <Shared path="/streams/shared/:accessCode" />
          <NotFound path="/not-found" default />
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
