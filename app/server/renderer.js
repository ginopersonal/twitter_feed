import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import routes from '../routes';
import initializeStore from './initializeStore';

export default function handleResponseRender(req, res) {

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(301, redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			res.status(500).send(error.message);
		} else if (!renderProps) {
			res.status(404).send('Not found');
		} else {

			initializeStore().then(store => {
				const initialState = store.getState();
				const componentHTML = ReactDOM.renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps}/>
					</Provider>
				);
				res.end(renderPage(componentHTML, initialState));
			});

		}
	});
}

function renderPage(html, initialState) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    	<title>Presidential Race Tweet Renderer</title>
		<link rel="stylesheet" href="/static/bundle.css"/>
	</head>
	<body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
		<script src="/static/external-bundle.js"></script>
		<script src="/static/bundle.js"></script>
	</body>
	</html>   `;
}
