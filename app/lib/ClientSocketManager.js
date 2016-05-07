import io from 'socket.io-client';

import { updateTweets } from '../actions/tweet';

export default class ClientSocketManager {
	constructor() {
		this.socket = null;
	}

	// turn streaming on (if it's off)
	activateStreaming(filter, dispatch) {
		if (this.socket === null) {
			this.socket = io('http://localhost:5010');
			this.socket.on('tweet', data => {
				if (data.id === filter) {
					dispatch(updateTweets(data.tweet, data.id));
				}
			});
		}
	}

	// turn streaming off (if it's on)
	deactivateStreaming() {
		if (this.socket !== null) {
			this.socket.disconnect();
			this.socket = null;
		}
	}
}
