import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

// smart component knows when path is changed
// displays header bar and menu
class Header extends Component {
	render() {
		const { location } = this.props;
		const paths = [
			'/list/trump',
			'/list/clinton'
		];

		return (
			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
						Twitter Feed
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>{
						paths.map(path => {
							const className = path === location.path ? 'active' : '';
							const title = path.slice(path.lastIndexOf('/') + 1).toUpperCase();
							return <li className={className} role="presentation" key={path}><Link role="button" to={path}>{title}</Link></li>;
						})
					}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Header);
