import * as types from '../constants/actionTypes';

const user = (state = {}, action)  => {

    switch(action.type) {
        case types.FETCH_USER_SUCCESS:
            return Object.assign({}, state, action.payload);
        default :
            return state;
    }
};

export default user;
  