import fetch from 'isomorphic-fetch';

export const ADD_TWEET = 'ADD_TWEET';
export const TOGGLE_STREAM = 'TOGGLE_STREAM';

// executed with a list of new tweets
export function updateTweets(tweets, filter) {
	return {
		type: ADD_TWEET,
		payload: {
			tweets: Array.isArray(tweets) === false ? [tweets] : tweets,
			filter: filter
		}
	};
}

// requests that streaming value for specific page be toggled on or off
export function toggleStream(filter) {
	return {
		type: TOGGLE_STREAM,
		payload: {
			filter: filter
		}
	};
}

// initiates the non-streaming refresh of tweets
export function fetchTweets(props) {
	const filter = props.filter;
	return dispatch => {
		return fetch('http://localhost:5010/services/tweets/' + filter)
			.then(response => {
				if (response.status >= 400 && response.status <= 600) {
					throw response.status;
				}
				return response.json();
			})
			.then(json => {
				dispatch(updateTweets(json.tweets, filter));
			}).catch(() => {
				dispatch(updateTweets([], filter));
			});
	};
}
