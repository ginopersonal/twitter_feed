import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import { fetchTweets, toggleStream } from '../actions/tweet';
import List from '../components/List';
import ToolBar from '../components/ToolBar';
import ClientSocketManager from '../lib/ClientSocketManager';

// primary component of app, takes the filter param and
// enables the streaming or refreshing of tweets
class TweetList extends Component {

	constructor() {
		super();

		// rely on the this class to manage the socket.io client
		this.clientSocketManager = new ClientSocketManager();
	}

	componentDidMount() {
		const { tweetState, tweets, filter, dispatch } = this.props;

		if (tweetState[filter].streaming) {
			this.clientSocketManager.activateStreaming(filter, dispatch);
		}

		// with server side rendering we should never come to this page in such a state, but just
		// in case grab the latest static tweets from the search api
		if (tweets.hasOwnProperty(filter) === false) {
			dispatch(fetchTweets({
				filter: filter
			}));
		}
	}

	componentDidUpdate() {
		const { tweetState, filter, dispatch } = this.props;

		// handle possible toggle of streaming button
		if (tweetState[filter].streaming) {
			this.clientSocketManager.activateStreaming(filter, dispatch);
		} else {
			this.clientSocketManager.deactivateStreaming();
		}
	}

	componentWillUnmount() {

		// turn listening to socket.io updates off when the component unmounts to save
		// the thrashing of our store
		this.clientSocketManager.deactivateStreaming();
	}

	render() {
		const { tweetState, tweets, filter, dispatch } = this.props;

		let tweetList = [];
		if (tweets.hasOwnProperty(filter)) {
			tweetList = tweets[filter];
		}

		return (
			<div className="container">
				<div className="row">
					<h1>{filter} tweets</h1>
				</div>
				<ToolBar stream={tweetState[filter].streaming} streamButtonClickHandler={() => {
					dispatch(toggleStream(filter));
				}} refreshButtonClickHandler={() => {
					dispatch(fetchTweets({
						filter: filter
					}));
				}} />
				<List tweets={tweetList}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(TweetList);
