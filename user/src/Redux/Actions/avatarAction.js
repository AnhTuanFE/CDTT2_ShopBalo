import React from 'react';
import axios from 'axios';
import { AVATAR_REQUEST, AVATAR_SUCCESS, AVATAR_FAIL } from '../Constants/AvatarConstants';
export const ListAvatar = () => async (dispatch) => {
    try {
        dispatch({ type: AVATAR_REQUEST });
        const { data } = await axios.get(`/api/avatar`);
        dispatch({ type: AVATAR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: AVATAR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
