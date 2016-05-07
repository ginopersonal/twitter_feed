import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

export default class App extends Component {

	render() {

		const trumpLink = <Link to="/list/trump">TRUMP</Link>;
		const clintonLink = <Link to="list/clinton">CLINTON</Link>;

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Twitter Feed Example</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<p>Click on either the {trumpLink} or {clintonLink} links to jump to a list of tweets mentioning their names.</p>
						<p>The {trumpLink} feed starts in a static mode.  The 10 latest tweets are taken from Twitter's restful search API.</p>
						<p>The {clintonLink} feed starts in streaming mode.</p>
					</div>
				</div>
			</div>
		);
	}
}
