import { Action, UserActionTypes as Types } from '../actions';

export type UserState = {
    id: number;
    name: string;
    isLoading: boolean;
    hasError: boolean;
};

const initState = {
    id: 0,
    name: '',
    isLoading: false,
    hasError: false,
};

const fetchBegin = (state: UserState): UserState => {
    return Object.assign({}, state, { isLoading: true });
};

const fetchSuccess = (state: UserState, usr: any): UserState => {
    return Object.assign({}, state, {
        id: usr.id || 0,
        name: usr.name || '',
        isLoading: false,
    });
};

const fetchFailure = (state: UserState): UserState => {
    return Object.assign({}, state, { isLoading: false, hasError: true });
};

const user = (state: UserState = initState, action: Action): UserState => {
    const payload = action.payload;

    switch (action.type) {
        case Types.FETCH_SUCCESS:
            return fetchSuccess(state, payload.user);
        case Types.FETCH_BEGIN:
            return fetchBegin(state);
        case Types.FETCH_FAILURE:
            return fetchFailure(state);
        default:
            return state;
    }
};

export default user;
