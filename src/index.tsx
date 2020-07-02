import './hotLoader.setup';
import 'mobx-react-lite/batchingForReactDom';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider } from '@reach/router';
import createHistory from 'helpers/history';
import ReactGA from 'react-ga';
import App from 'components/App';
import 'styles/index.scss';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line
// @ts-ignore
export const history = createHistory(window);

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  // eslint-disable-next-line
  // @ts-ignore
  <LocationProvider history={history}>
    <App />
  </LocationProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
