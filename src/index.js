import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Login from "./components/Login";
import { Provider } from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import {fromJS} from "immutable";
import createReducer from './redux/reducer';
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from "history";
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from "./components/Register";
import Home from "./components/Home";
const history = createBrowserHistory();
const initialState = {};
const reduxSagaOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaOptions);
const middlewares = [sagaMiddleware, routerMiddleware((history))]
const enhancers = [applyMiddleware(...middlewares)];
let composeEnhancers = compose;

const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/register' component={Register} exact />
                <Route path='/home' component={Home} exact />
                <Route path='/' component={Login} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
