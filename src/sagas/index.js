import { takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { loadUser } from './loadUser';
import * as types from '../constants/actionTypes';
import { loadReports } from './loadReports';

function *rootSaga() {
    yield [
        fork(loadUser),
        fork(loadReports),
        takeEvery(types.REPORTS_FETCH_BEGIN, loadReports),
        takeLatest(types.USER_FETCH_BEGIN, loadUser)
    ];
}

export default rootSaga;
