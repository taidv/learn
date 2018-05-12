import { call, put } from 'redux-saga/effects';
import { loadReports as getReports } from './apiCalls';
import * as types from '../constants/actionTypes';

export function *loadReports() {
    try {

        const reports = yield call(getReports);
        yield put({type: types.FETCH_REPORTS_SUCCESS, payload: reports});
        console.log('put FETCH_REPORTS_SUCCESS ', reports);

    } catch (error) {
        yield put({type: types.FETCH_REPORTS_FAILURE, error});
    }
}
