import config from 'config';
import express from 'express';
import favicon from 'express-favicon';
import path from 'path';
import requireDir from 'require-dir';
import bodyParser from 'body-parser';

import handleResponseRender from './renderer';
import { initializeStreams } from './twitter';

const app = express();
let server;

export function start(cb) {

	const port = config.server.port;

	app.use(favicon(__dirname + '/../../client-dist/static/images/favicon.ico'));
	app.use('/static', express.static(path.join(__dirname, '/../../client-dist/static')));
	app.use(bodyParser.json());

	// grab all the api routes and set them to app before going global
	const serviceRoutes = requireDir('../services');
	for (let routeCategory in serviceRoutes) {
		if (serviceRoutes.hasOwnProperty(routeCategory)) {
			serviceRoutes[routeCategory].default(app);
		}
	}

	app.all('/*', handleResponseRender);

	server = app.listen(port, cb);

	// setup socket.io for the browser to get streaming tweets
	var io = require('socket.io').listen(server);
	initializeStreams(io);

}

export function stop(cb) {

	try {
		server.close(cb);
	} catch(e) {
		if (cb) {
			return cb(e);
		}
		process.exit(1);
	}

}
