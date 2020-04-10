import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalManager from 'components/ModalManager';
import { Spinner } from 'ui-kit';
import NotFound from 'routes/NotFound';

const Dashboard = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/dashboard'),
);
const Pending = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/Pending'),
);
const Account = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/account'),
);
const Wallet = lazy(() => import(/* webpackPrefetch: true */ 'routes/wallet'));
const Terms = lazy(() => import(/* webpackPrefetch: true */ 'routes/terms'));
const Privacy = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/privacy'),
);
const SignIn = lazy(() => import(/* webpackPrefetch: true */ 'routes/signin'));
const SignUp = lazy(() => import(/* webpackPrefetch: true */ 'routes/signup'));
const StreamsRoot = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/StreamsRoot'),
);
const Streams = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/streams'),
);
const NewStream = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/new-stream'),
);
const Stream = lazy(() => import(/* webpackPrefetch: true */ 'routes/stream'));
const Shared = lazy(() => import(/* webpackPrefetch: true */ 'routes/shared'));
const Workers = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/workers'),
);
const Worker = lazy(() => import(/* webpackPrefetch: true */ 'routes/worker'));
const Confirm = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/Confirm'),
);

const Billing = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/billing'),
);

const BillingDetails = lazy(() =>
  import(/* webpackPrefetch: true */ 'routes/billing-details'),
);

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
            <Billing path="billing" />
            <BillingDetails path="billing-details" />
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
