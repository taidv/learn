import * as types from '../constants/actionTypes';

const report = (state = {}, action)  => {

    switch(action.type) {
        case types.FETCH_REPORTS_SUCCESS:
            return action.payload;
        default :
            return state;
    }
};

export default report;