import {
    USER_DISABLED_FAIL,
    USER_DISABLED_REQUEST,
    USER_DISABLED_RESET,
    USER_DISABLED_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../Constants/UserContants';

// LOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

// PUT USER
export const userdisabledReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DISABLED_REQUEST:
            return { loading: true };
        case USER_DISABLED_SUCCESS:
            return { loading: false, userNoti: action.payload, success: true };
        case USER_DISABLED_FAIL:
            return { loading: false, error: action.payload };
        case USER_DISABLED_RESET:
            return {};
        default:
            return state;
    }
};
