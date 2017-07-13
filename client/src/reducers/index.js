import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import PostsReducer from './reducer_posts';

// import { AUTH_USER, UNAUTH_USER } from '../actions/types';  // These are already imported in auth_reducer


const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	posts: PostsReducer
});


export default rootReducer;

