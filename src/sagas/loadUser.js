import { call, put } from 'redux-saga/effects';
import { loadUser as getUser } from './apiCalls';
import * as types from '../constants/actionTypes';

export function *loadUser() {
    try {
        
        const user = yield call(getUser);
        yield put({type: types.FETCH_USER_SUCCESS, payload: user});
        console.log('put FETCH_USER_SUCCESS ', user);

    } catch (error) {
        yield put({type: types.FETCH_USER_FAILURE, error});
    }
}
