import { call, put } from 'redux-saga/effects';
import { loadReports as getReports } from './apiCalls';
import * as types from '../constants/actionTypes';

export function *loadReports() {
    try {

        const reports = yield call(getReports);
        yield put({type: types.REPORTS_FETCH_SUCCESS, reports: reports});

    } catch (error) {
        yield put({type: types.REPORTS_FETCH_FAILURE, error});
    }
}
