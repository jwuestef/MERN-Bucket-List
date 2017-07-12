// Axios is a promise based library that allows us to make AJAX requests
import axios from 'axios';

export const CREATE_POSTS = 'CREATE_POSTS';

// const ROOT_URL = 'http://rest.learncode.academy/api/jwuestef';
const ROOT_URL = 'http://localhost:3000';



export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
};




export function signinUser({email, password}) {

	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, {email, password});
	};

};



// We are creating a constant, like we did in our Redux Fundamentals called CREATE_POSTS.

// We use a constant Root_URL to call out to a test api. 
// We’re doing this because we don’t have our backend set up yet for this. 
// Right? We are using the learncode.academy one. 
// Feel free to change the last item in the url from ‘/paul’ to your name or your own collection.

// We also have the action creator function called createPost. 
// Notice that it’s an action creator because it returns an action.
