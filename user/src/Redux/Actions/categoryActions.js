import React from 'react';
import axios from 'axios';
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from '../Constants/CategoryConstants';

export const ListCategory = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });
        const { data } = await axios.get(
            `/api/category/`
        )
        dispatch({ type: CATEGORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};
