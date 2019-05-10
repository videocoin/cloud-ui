import { hot } from 'react-hot-loader/root';
import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import DevTools from 'mobx-react-devtools';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = lazy(() => import('routes/Dashboard'));
const Pending = lazy(() => import('routes/Pending'));
const SignIn = lazy(() => import('routes/signin/SignIn'));
const SignUp = lazy(() => import('routes/signup/SignUp'));

const App = () => {
  return (
    <>
      <DevTools />
      <Header />
      <Suspense fallback={<div />}>
        <Router className="wrapper">
          <Dashboard path="/dashboard" default />
          <Pending path="/pending" />
          <SignIn path="/sign-in" />
          <SignIn path="/recovery" />
          <SignUp path="/sign-up" />
        </Router>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default hot(App);
