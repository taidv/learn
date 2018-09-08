import { combineReducers } from 'redux';
import user, { UserState } from './user';

export interface State {
    user: UserState;
}

const rootReducer = combineReducers<State>({
    user,
});

export default rootReducer;
