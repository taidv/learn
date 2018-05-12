//REMOVE
import * as types from '../constants/actionTypes';

export const fetchReportsBegin = () => ({
    type: types.FETCH_REPORT_BEGIN
});

export const fetchReportsSuccess = reports => ({
    type: types.FETCH_REPORT_SUCCESS,
    payload: { reports }
});

export const fetchReportsError = error => ({
    type: types.FETCH_REPORT_FAILURE,
    payload: { error }
});