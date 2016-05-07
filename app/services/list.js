import { client as twitterClient } from '../server/twitter';

export default function list(app) {

	app.get('/services/tweets/:filter', (req, res) => {

		twitterClient.get('search/tweets', {q: req.params.filter, count: 10}, (error, tweets) => {
			res.status(200).json({
				tweets: tweets.statuses
			});
		});

	});
}
