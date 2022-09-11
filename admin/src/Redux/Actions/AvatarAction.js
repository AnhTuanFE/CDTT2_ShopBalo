import React from 'react';
import axios from 'axios';
import {
    AVATAR_CREATE_FAIL,
    AVATAR_CREATE_RESET,
    AVATAR_CREATE_SUCCESS,
    AVATAR_DELETE_FAIL,
    AVATAR_DELETE_REQUEST,
    AVATAR_DELETE_SUCCESS,
    AVATAR_LIST_FAIL,
    AVATAR_LIST_REQUEST,
    AVATAR_LIST_SUCCESS,
} from '../Constants/AvatarConstants';
import { logout } from './userActions';

export const ListAvatar = () => async (dispatch) => {
    try {
        dispatch({ type: AVATAR_LIST_REQUEST });
        const { data } = await axios.get(`/api/avatar`);
        dispatch({ type: AVATAR_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: AVATAR_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteAvatar = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: AVATAR_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/avatar/${id}`, config);

        dispatch({ type: AVATAR_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: AVATAR_DELETE_FAIL,
            payload: message,
        });
    }
};

export const createAvatar = (url, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: AVATAR_CREATE_RESET });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/avatar/`, { url, id }, config);

        dispatch({ type: AVATAR_CREATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: AVATAR_CREATE_FAIL,
            payload: message,
        });
    }
};
