import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-redux';


class NavBarHeader extends Component {


	renderLinks() {
		if(this.props.authenticated) {
			return <NavItem href="#">Sign Out</NavItem>
		} else {
			return [
				<NavItem key={1} href="#">Sign In</NavItem>
				<NavItem key={2} href="#">Sign Up</NavItem>
			];
		}
	}


	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Bucket List</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					{this.renderLinks()}
					<NavDropdown key={3} title="Cool Stuff" id="basic-nav-dropdown">
						<MenuItem key={3.1}>Action</MenuItem>
						<MenuItem key={3.2}>Another action</MenuItem>
						<MenuItem key={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem key={3.3}>Separated link</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	};



	// This function is what turns this component into a smart component(container). 
	// Remember that the state is passed in to this function, and the it will tell whether or not the user is authenticated
	function mapStateToProps(state) {
		return {
			authenticated: state.auth.authenticated
		}
	}


}



// Use ‘connect’ to pass in mapStateToProps. Using this will allow us to use auth.authenticated in the component mapStateToProps
export default connect(mapStateToProps)(NavBarHeader);
