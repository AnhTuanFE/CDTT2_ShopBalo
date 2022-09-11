import {
    AVATAR_CREATE_FAIL,
    AVATAR_CREATE_REQUEST,
    AVATAR_CREATE_RESET,
    AVATAR_CREATE_SUCCESS,
    AVATAR_DELETE_FAIL,
    AVATAR_DELETE_REQUEST,
    AVATAR_DELETE_SUCCESS,
    AVATAR_LIST_FAIL,
    AVATAR_LIST_REQUEST,
    AVATAR_LIST_SUCCESS,
} from '../Constants/AvatarConstants';

export const avatarListReducer = (state = { avatar: [] }, action) => {
    switch (action.type) {
        case AVATAR_LIST_REQUEST:
            return { loading: true, avatar: [...state.avatar] };
        case AVATAR_LIST_SUCCESS:
            return {
                loading: false,
                avatar: action.payload,
            };
        case AVATAR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const avatarDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case AVATAR_DELETE_REQUEST:
            return {
                loading: true,
            };
        case AVATAR_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case AVATAR_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const avatarCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case AVATAR_CREATE_REQUEST:
            return { loading: true };
        case AVATAR_CREATE_SUCCESS:
            return { loading: false, success: true, avatar: action.payload };
        case AVATAR_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case AVATAR_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
