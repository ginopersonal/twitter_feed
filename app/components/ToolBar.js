import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

// toolbar to turn streaming on or off as well as refresh static tweets
export default class Header extends Component {
	render() {
		const { stream, streamButtonClickHandler, refreshButtonClickHandler } = this.props;

		let refreshButton;
		let streamButton;

		if (stream) {
			refreshButton = <button onClick={refreshButtonClickHandler} disabled="true" type="button" className="btn btn-default">Refresh</button>;
			streamButton = <button onClick={streamButtonClickHandler} type="button" className="btn btn-primary">Stream Off</button>;
		} else {
			refreshButton = <button onClick={refreshButtonClickHandler} type="button" className="btn btn-primary">Refresh</button>;
			streamButton = <button onClick={streamButtonClickHandler} type="button" className="btn btn-default">Stream On</button>;
		}

		return (
			<div className="row tf-toolbar">
				<div className="col-md-12">
					<div className="btn-group" role="group">
						{streamButton}
						{refreshButton}
					</div>
				</div>
			</div>
		);
	}
}
