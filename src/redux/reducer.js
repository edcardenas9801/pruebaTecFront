import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { createBrowserHistory } from "history";
import { connectRouter }  from 'connected-react-router';
import login from './modules/login';

export default function createReducer() {
    const history = createBrowserHistory();
    const rootReducer = combineReducers({
        form,
        login,
        router: connectRouter(history),
    });

    const mergeWithRouterState = connectRouter(history);
    return mergeWithRouterState(rootReducer);
}