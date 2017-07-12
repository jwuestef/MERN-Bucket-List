import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';






class Signin extends Component {


	handleFormSubmit({email, password}) {
		console.log(email, password);
		//need to do something to log user in
		this.props.signinUser({email, password});
	};


	// We can now use the errorMessage from the mapStateToProps as a prop now by calling this.props.errorMessage
	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Sorry Partner.</strong> {this.props.errorMessage}
				</div>
			);
		};
	};


	render() {

		const {handleSubmit, fields:{email, password}} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
				</fieldset>

				{this.renderAlert()}

				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	};


};




// This allows us to use the returned errorMessage in React code
function mapStateToProps(state) {
	return {errorMessage: state.auth.error};
};




// First set of parens is for configuration. Second set is for components.
export default reduxForm({
	form: 'signin',  // Form name
	fields: ['email', 'password']  // Array of fields
}, mapStateToProps, actions)(Signin);