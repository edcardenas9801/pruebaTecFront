import { fromJS } from 'immutable';
import { actions } from '../actions';

const initialState = {
    loginLoading: true,
    loginError: null
}

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
    if(action.type === actions.GET_LOGIN){
        return state.withMutations(mutableState => {
            mutableState.set('loginLoading', true);
        })
    }else{
        return state;
    }
}