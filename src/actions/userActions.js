import * as types from '../constants/actionTypes';

export const fetchUserBegin = () => ({
    type: types.USER_FETCH_BEGIN
});

export const fetchUserSuccess = user => ({
    type: types.USER_FETCH_SUCCESS,
    user: user
});

export const fetchUserError = error => ({
    type: types.USER_FETCH_FAILURE,
    error: error
});

export const clearUser = () => ({
    type: types.USER_CLEAR
});