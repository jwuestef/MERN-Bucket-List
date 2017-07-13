// Axios is a promise based library that allows us to make AJAX requests
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS, FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST } from './types';
import authReducer from '../reducers/auth_reducer';


//export const CREATE_POSTS = 'CREATE_POSTS';

const ROOT_URL = 'http://localhost:3000';

var config = {
	headers: { authorization: localStorage.getItem("token") }
};




export function createPost(props) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/newitem`, {props}, config)
			.then(request => {
				dispatch({
					type: CREATE_POSTS,
					payload: request
				});
				browserHistory.push("/items");
			});
	};
};




export function fetchPosts() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/items`, config)
			.then( (response) => {
				console.log("Response", response)
				dispatch({
					type: FETCH_POSTS,
					payload: response
				});
			});
	};
};




export function fetchPost(id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/items/${id}`, config)
			.then( (response) => {
				dispatch({
					type:FETCH_POST,
					payload: response
				});
				// browserHistory.push("/items");
			});
	};
};




export function deletePost(id) {
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/items/${id}`, config)
			.then( (response) => {
				dispatch({
					type:DELETE_POST,
					payload: response
				});
				browserHistory.push("/items");
			});
	};
};




export function updatePost(props, id) {
	return function(dispatch) {
		axios.put(`${ROOT_URL}/items/${id}`, {props}, config)
			.then( (response) => {
				dispatch({
					type:UPDATE_POST,
					payload: response
				});
				browserHistory.push("/items");
			});
	};
};




export function signinUser({email, password}) {

	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, {email, password})
			.then(response => {
				// This only kickstarts if the request was good...
				// We now update the state to indicate authenticated user
				dispatch({type: AUTH_USER});
				// This will put the token in localStorage. It's safe!
				localStorage.setItem('token', response.data.token);
				// This sends us off to the /newitem view
				browserHistory.push('/newitem');
			})
			.catch( (response) => {
				dispatch(authError("Bad login info"));
			});
	};

};




export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
};




// Purpose of type is to catch unauth_user case
// Flips auth flag to false & there won't be any links associated with them
// Other thing to do is get rid of token
export function signoutUser() {
	localStorage.removeItem("token");
	return {type: UNAUTH_USER};
};




export function signupUser({email, password}) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signup`, {email, password})
			.then(response => {
				dispatch({type: AUTH_USER});
				// Update the token
				localStorage.setItem("token", response.data.token);
				browserHistory.push('/newitem');
			})
			.catch(response => dispatch(authError(response.data.error)));
	};
};




// We are creating a constant, like we did in our Redux Fundamentals called CREATE_POSTS.

// We use a constant Root_URL to call out to a test api. 
// We’re doing this because we don’t have our backend set up yet for this. 
// Right? We are using the learncode.academy one. 
// Feel free to change the last item in the url from ‘/paul’ to your name or your own collection.

// We also have the action creator function called createPost. 
// Notice that it’s an action creator because it returns an action.
