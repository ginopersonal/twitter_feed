import _ from 'underscore';

export default {
	tweets: {
		ADD_TWEET: (state, action) => {
			const retState = Object.assign({}, state);
			if (!retState.hasOwnProperty(action.payload.filter)) {
				retState[action.payload.filter] = [];
			}

			// in case the stream hiccups and we get multiples of the same tweets, remove them
			const parsedList = _.uniq(action.payload.tweets.concat(retState[action.payload.filter]), tweet => {
				return tweet.id;
			});

			// minimize thrashing of our page by only displaying 10 tweets
			retState[action.payload.filter] = parsedList.slice(0, 10);
			return retState;
		},
		DEFAULT: (state = { }) => state
	},
	tweetState: {
		TOGGLE_STREAM: (state, action) => {
			const retState = Object.assign({}, state);
			if (retState.hasOwnProperty(action.payload.filter)) {
				retState[action.payload.filter].streaming = !retState[action.payload.filter].streaming;
			}
			return retState;
		},
		DEFAULT: (state = {
			clinton: {
				streaming: true
			},
			trump: {
				streaming: false
			}
		}) => state
	}
};
