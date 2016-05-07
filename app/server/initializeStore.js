import Promise from 'bluebird';

import configureStore from '../store/configureStore';
import { client as twitterClient } from '../server/twitter';

function dataGrabPromise(filter) {
	return new Promise((resolve) => {
		twitterClient.get('search/tweets', {q: filter, count: 10}, (error, tweets) => {
			if (!error) {
				resolve(tweets.statuses);
			} else {
				resolve([]);
			}
		});
	});
}

// grab the last 10 tweets re clinton and trump to enable server side rendering
export default function initializeStore() {

	const promises = [dataGrabPromise('trump'), dataGrabPromise('clinton')];

	return new Promise((resolve) => {
		Promise.all(promises).then(results => {
			const store = configureStore({
				tweets: {
					trump: results[0],
					clinton: results[1]
				}
			});
			resolve(store);
		});
	});
}
