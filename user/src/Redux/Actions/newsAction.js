import React from 'react';
import axios from 'axios';
import { logout } from './userActions';
import {
    NEWS_LIST_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_GET_FAIL,
    NEWS_GET_REQUEST,
    NEWS_GET_SUCCESS,
} from '../Constants/NewsContants.js';

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
export const getNews = (newsId) => async (dispatch) => {
    try {
        dispatch({ type: NEWS_GET_REQUEST });
        const { data } = await axios.get(`/api/news/${newsId}`);
        dispatch({ type: NEWS_GET_SUCCESS, payload: data });
    } catch (error) {
        // const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout());
        // }
        dispatch({
            type: NEWS_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
