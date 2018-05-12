import * as types from '../constants/actionTypes';

export const fetchReportsBegin = () => ({
    type: types.REPORTS_FETCH_BEGIN
});

export const fetchReportsSuccess = reports => ({
    type: types.REPORTS_FETCH_SUCCESS,
    reports: reports 
});

export const fetchReportsError = error => ({
    type: types.REPORTS_FETCH_FAILURE,
    error: error
});

export const clearReports = () => ({
    type: types.REPORTS_CLEAR
});