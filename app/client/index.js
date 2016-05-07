import 'babel-polyfill';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../store/configureStore';
import { updateLocationAction } from '../actions/core';
import routes from '../routes';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => store.dispatch(updateLocationAction(location)));

ReactDOM.render(
	<Provider store={store}>
		<Router children={routes} history={history} />
	</Provider>,

	document.getElementById('root')
);
