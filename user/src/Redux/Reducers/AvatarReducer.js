import React from 'react';
import { AVATAR_FAIL, AVATAR_SUCCESS, AVATAR_REQUEST } from '../Constants/AvatarConstants';

export const Avatarload = (state = { avatar: [] }, action) => {
    switch (action.type) {
        case AVATAR_REQUEST:
            return { loading: true, avatar: [] };
        case AVATAR_SUCCESS:
            return {
                loading: false,
                avatar: action.payload,
            };
        case AVATAR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
