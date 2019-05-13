import React from 'react';
import ReactDOM from 'react-dom';
// import './hotLoader.setup';
import App from 'components/App';
import { connectReduxDevtools } from 'mst-middlewares';
import UserStore from './stores/user';
import 'styles/index.scss';
import * as serviceWorker from './serviceWorker';

connectReduxDevtools(require('remotedev'), UserStore);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
