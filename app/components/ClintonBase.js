import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import TweetList from '../containers/TweetList';

// base component for clinton tweets
export default class ClintonBase extends Component {
	render() {
		return (
			<TweetList filter="clinton"/>
		);
	}
}
