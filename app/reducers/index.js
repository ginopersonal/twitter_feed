import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import coreReducers from './core';
import tweetReducers from './tweet';

let reducers = {};
const reducerMaps = [coreReducers, tweetReducers];

// my personal "redux has too much repeated fluff" fix, makes the reducers small and readable
// assume/force the reducers are objects that map to action types (eliminates large switch statement in reducers)
const mapFunc = reducerActions => {
	return (state, action) => {
		if (reducerActions.hasOwnProperty(action.type)) {
			return reducerActions[action.type](state, action);
		} else if (reducerActions.hasOwnProperty('DEFAULT')) {
			return reducerActions.DEFAULT(state);
		} else {
			return state;
		}
	};
};

for (let reducerMap of reducerMaps) {
	for (let key in reducerMap) {
		if (reducerMap.hasOwnProperty(key)) {
			reducers[key] = mapFunc(reducerMap[key]);
		}
	}
}

reducers.routing = routerReducer;

export default combineReducers(reducers);
