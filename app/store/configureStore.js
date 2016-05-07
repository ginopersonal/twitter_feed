import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

// standard redux/thunk boilerplate store configuration
export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware, createLogger())
	);

	return store;
}
