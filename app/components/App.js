import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Header from '../containers/Header';

// core component used to enclose route based children
export default class App extends Component {

	render() {
		return (
			<div id="app">
				<Header/>
				{this.props.children}
			</div>
		);
	}
}
