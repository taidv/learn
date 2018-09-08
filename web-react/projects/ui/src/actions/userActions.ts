import { Action } from './baseAction';

export const ActionTypes = {
    FETCH_BEGIN: '@@HRBC/USER__FETCH_BEGIN',
    FETCH_SUCCESS: '@@HRBC/USER__FETCH_SUCCESS',
    FETCH_FAILURE: '@@HRBC/USER__FETCH_FAILURE',
};

export const UserActions = {
    fetchBegin: (): Action => ({
        type: ActionTypes.FETCH_BEGIN,
        payload: {},
    }),

    fetchSuccess: (user: any): Action => ({
        type: ActionTypes.FETCH_SUCCESS,
        payload: {
            user: user,
        },
    }),

    fetchFailure: (error: any): Action => ({
        type: ActionTypes.FETCH_FAILURE,
        payload: {
            error: error,
        },
    }),
};
