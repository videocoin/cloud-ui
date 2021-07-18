import './hotLoader.setup';
import 'mobx-react-lite/batchingForReactDom';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider } from '@reach/router';
import createHistory from 'helpers/history';
import App from 'components/App';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import '@fontsource/teko/700.css';
import 'styles/index.scss';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line
// @ts-ignore
export const history = createHistory(window);

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
