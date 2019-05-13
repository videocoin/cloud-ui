import React, { Suspense, lazy } from 'react';
import { Redirect, Router } from '@reach/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = lazy(() => import('routes/dashboard/Dashboard'));
const DashHome = lazy(() => import('routes/DashHome'));
const Pending = lazy(() => import('routes/Pending'));
const Account = lazy(() => import('routes/account/Account'));
const SignIn = lazy(() => import('routes/signin/SignIn'));
const SignUp = lazy(() => import('routes/signup/SignUp'));

const App = () => {
  return (
    <>
      <Suspense fallback={<div />}>
        <Router className="wrapper">
          <Redirect from="/" to="/dashboard" noThrow />
          <Dashboard path="/dashboard">
            <DashHome path="/" />
            <Pending path="pending" />
            <Account path="account" />
          </Dashboard>
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
        </Router>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default App;
