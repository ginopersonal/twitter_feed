import React from 'react'; // eslint-disable-line no-unused-vars
import { Route } from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import ClintonBase from '../components/ClintonBase';
import TrumpBase from '../components/TrumpBase';

export default (

	<Route component={App}>
		<Route component={Home} path="/" />
		<Route component={TrumpBase} path="/list/trump" />
		<Route component={ClintonBase} path="/list/clinton" />
	</Route>
);
