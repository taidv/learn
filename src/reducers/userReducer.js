import * as types from '../constants/actionTypes';

const user = (state = {}, action)  => {

    switch(action.type) {
        case types.USER_FETCH_SUCCESS:
            return Object.assign({}, state, action.user);
        case types.USER_FETCH_BEGIN:
        case types.USER_CLEAR:
            return {};
        default :
            return Object.assign({}, state);
    }
};

export default user;
  