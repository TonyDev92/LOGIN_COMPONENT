import {LOGGIN_SUCCESS, LOGGIN_FAILURE, LOGOUT_SUCCESS} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case LOGGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
}

export default authReducer;