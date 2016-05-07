import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

// displays list of tweets
export default class List extends Component {
	render() {
		const { tweets } = this.props;

		return (
				<div className="row">
					{
						tweets.map(tweet => {
							return <div className="col-md-4" key={tweet.id}>
								<div className="panel panel-default">
									<div className="panel-heading">
										<h3 className="panel-title">{tweet.user && tweet.user.screen_name}</h3>
									</div>
									<div className="panel-body">
										{tweet.text}
									</div>
								</div>
							</div>;
						})
					}
				</div>
		);
	}
}
