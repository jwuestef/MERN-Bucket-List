import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import ListItem from './components/list/new-list-item';


var createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
	// The Provider is what communicates with connected components. 
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="signin" component={Signin} />
				<Route path="newitem" component={ListItem} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container')
);


