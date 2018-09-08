import * as types from '../constants/actionTypes';

const initState = {
    reports: []
};

const report = (state = initState, action)  => {

    let newState = Object.assign({}, state);

    switch(action.type) {
        case types.REPORTS_FETCH_SUCCESS:
            newState.reports = action.reports;
            break;
        case types.REPORTS_FETCH_BEGIN:
        case types.REPORTS_CLEAR:
            newState.reports = {};
            break;
        default :
            break;
    }
    return newState;
};

export default report;