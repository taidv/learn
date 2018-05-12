import { takeLatest, fork } from 'redux-saga/effects';
import { loadUser } from './loadUser';
import * as types from '../constants/actionTypes';
import { loadReports } from './loadReports';

function *rootSaga() {
    yield [
        fork(loadUser),
        fork(loadReports)
        //takeLatest(types.FETCH_USER_SUCCESS, loadUser)
    ];
}

export default rootSaga;
