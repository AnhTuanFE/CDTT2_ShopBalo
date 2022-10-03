import React from 'react';
import axios from 'axios';
import {
    NEWS_CREATE_FAIL,
    NEWS_CREATE_RESET,
    NEWS_CREATE_SUCCESS,
    NEWS_CREATE_REQUEST,
    NEWS_DELETE_FAIL,
    NEWS_DELETE_REQUEST,
    NEWS_DELETE_SUCCESS,
    NEWS_LIST_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_EDIT_FAIL,
    NEWS_EDIT_REQUEST,
    NEWS_EDIT_SUCCESS,
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_UPDATE_FAIL,
} from '../Constants/NewsConstants.js';
import { logout } from './userActions';

//GET ALL NEWS
export const ListNews = () => async (dispatch) => {
    try {
        dispatch({ type: NEWS_LIST_REQUEST });
        const { data } = await axios.get(`/api/news`);
        dispatch({ type: NEWS_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

//GET NEWS
export const editNews = (id) => async (dispatch) => {
    try {
        dispatch({ type: NEWS_EDIT_REQUEST });
        const { data } = await axios.get(`/api/news/${id}`);
        dispatch({ type: NEWS_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: NEWS_EDIT_FAIL,
            payload: message,
        });
    }
};

// DELETE NEWS
export const deleteNews = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/news/${id}`, config);

        dispatch({ type: NEWS_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: NEWS_DELETE_FAIL,
            payload: message,
        });
    }
};

//CREATE NEWS
export const createNews = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/news/`, value, config);

        dispatch({ type: NEWS_CREATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: NEWS_CREATE_FAIL,
            payload: message,
        });
    }
};

// UPDATE NEWS
export const updateNews = (idNews, value) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWS_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/news/${idNews}`, value, config);

        dispatch({ type: NEWS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: NEWS_UPDATE_FAIL,
            payload: message,
        });
    }
};
