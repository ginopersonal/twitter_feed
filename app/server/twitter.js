import config from 'config';
import Twitter from 'twitter';

export const client = new Twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});

export function initializeStreams(io) {

	const searchAndEmitTweet = (tweetToSearch, filter) => {
		if (tweetToSearch.text) {
			const searchableText = tweetToSearch.text.toLowerCase();
			if (searchableText.indexOf(filter) > -1) {
				io.emit('tweet', {
					id: filter,
					tweet: tweetToSearch
				});
			}
		}
	};

	// use one stream to search for clinton or trump
	client.stream('statuses/filter', {track: 'clinton,trump'}, stream => {
		stream.on('data', tweet => {
			if (tweet.hasOwnProperty('retweeted_status') === false) {
				// emit the results separately for each page in the app
				searchAndEmitTweet(tweet, 'clinton');
				searchAndEmitTweet(tweet, 'trump');
			}
		});
		stream.on('error', error => {
			throw error;
		});
	});
}
