import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';






class Signin extends Component {



	handleFormSubmit({email, password}) {
		console.log(email, password);
		//need to do something to log user in
		this.props.signinUser({email, password});
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
					<input {...password} className="form-control" />
				</fieldset>
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	};



};






// First set of parens is for configuration. Second set is for components.
export default reduxForm({
	form: 'signin',  // Form name
	fields: ['email', 'password']  // Array of fields
}, null, actions)(Signin);