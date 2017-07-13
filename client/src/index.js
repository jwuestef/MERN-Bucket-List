import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import ListItem from './components/list/new-list-item';
import ListsShow from './components/list/list-items';
import ListShow from './components/list/list-show';
import UpdateList from './components/list/update-list-item';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import {AUTH_USER } from './actions/types';


var createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="signin" component={Signin} />
				<Route path="signout" component={Signout} />
				<Route path="signup" component={Signup} />
				<Route path="newitem" component={RequireAuth(ListItem)} />
				<Route path="items" component={RequireAuth(ListsShow)} />
				<Route path="items/:id" component={RequireAuth(ListShow)} />
				<Route path="updateitem/:id" component={RequireAuth(UpdateList)} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container')
);


