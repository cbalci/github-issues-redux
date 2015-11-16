import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './components/App.js';
import RootReducer from './reducers';

import { ReduxRouter, reduxReactRouter } from 'redux-router';
import { IndexRoute, Route } from 'react-router';

import RepoSelectionPage from './pages/RepoSelectionPage.js';
import IssueListPage from './pages/IssueListPage.js';
import IssueDetailsPage from './pages/IssueDetailsPage.js';

const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={RepoSelectionPage} />
        <Route path='/:org/:repo/issues' component={IssueListPage} />
        <Route path='/:org/:repo/issues/:number' component={IssueDetailsPage} />
    </Route>
)

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
        routes,
        createHistory
    })
)(createStore);

const store = createStoreWithMiddleware(RootReducer);

ReactDOM.render(
    <Provider store={store}>
        <ReduxRouter />
    </Provider>, document.getElementById('app-container'));
