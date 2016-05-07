import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import TweetList from '../containers/TweetList';

// base component for trump tweets
export default class TrumpBase extends Component {
	render() {
		return (
			<TweetList filter="trump"/>
		);
	}
}
