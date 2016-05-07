import { start } from './index';
import * as log from 'winston';
import config from 'config';

start(err => {
	if (err) {
		// do something with error
	} else {
		log.info('Presidential Tweet Renderer');
		log.info('======================================');
		log.info('Navigate to...');

		log.info('http://localhost:' + config.server.port);
		log.info('======================================');
	}
});
