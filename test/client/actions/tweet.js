import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import config from 'config';

import { ADD_TWEET, TOGGLE_STREAM } from '../../../app/actions/tweet'
import { updateTweets, toggleStream, fetchTweets } from '../../../app/actions/tweet'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const filter = 'foo';

describe('toggle actions', () => {

	it('should send an action to toggle streams for the filter', () => {
		const expectedAction = {
			type: TOGGLE_STREAM,
			payload: {
				filter: filter
			}
		};
		expect(toggleStream(filter)).toEqual(expectedAction)
	});

});

describe('update tweet actions', () => {
	it('should send an array of tweets', () => {
		const tweets = ['foo','bar'];
		const expectedAction = {
			type: ADD_TWEET,
			payload: {
				filter: filter,
				tweets: tweets
			}
		};
		expect(updateTweets(tweets,filter)).toEqual(expectedAction);
	});

	it('should transform one tweet in to an array of tweets before sending', () => {
		const tweets = 'foo';
		const expectedAction = {
			type: ADD_TWEET,
			payload: {
				filter: filter,
				tweets: [tweets]
			}
		};
		expect(updateTweets(tweets,filter)).toEqual(expectedAction);
	})
});

describe('fetch tweet actions', () => {
	afterEach(() => {
		nock.cleanAll()
	});

	it('updates tweets with an array from the response', () => {
		const tweets = ['foo','bar'];

		nock('http://'+config.server.hostname+':'+config.server.port+'/')
			.get('/services/tweets/'+filter)
			.reply(200, { tweets: tweets });

		const expectedActions = [{
			type: ADD_TWEET,
			payload: {
				filter: filter,
				tweets: tweets
			}
		}];

		const store = mockStore();

		return store.dispatch(fetchTweets({
			filter: filter
		})).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
	});

	it('updates with an empty array if server responds with error', () => {
		nock('http://'+config.server.hostname+':'+config.server.port+'/')
			.get('/services/tweets/'+filter)
			.reply(500, { tweets: [] });

		const expectedActions = [{
			type: ADD_TWEET,
			payload: {
				filter: filter,
				tweets: []
			}
		}];

		const store = mockStore();

		return store.dispatch(fetchTweets({
			filter: filter
		})).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})



});