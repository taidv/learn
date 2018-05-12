import { call, put } from 'redux-saga/effects';
import { loadUser as getUser } from './apiCalls';
import * as types from '../constants/actionTypes';

export function *loadUser() {
    try {
        
        const user = yield call(getUser);
        yield put({type: types.USER_FETCH_SUCCESS, user: user});

    } catch (error) {
        yield put({type: types.USER_FETCH_FAILURE, error});
    }
}
