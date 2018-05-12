//REMOVE
import * as types from '../constants/actionTypes';

export const fetchUserBegin = () => ({
    type: types.FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
    type: types.FETCH_USER_SUCCESS,
    payload: { user }
});

export const fetchUserError = error => ({
    type: types.FETCH_USER_FAILURE,
    payload: { error }
});