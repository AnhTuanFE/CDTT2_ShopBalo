import axios from 'axios';
import {
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ALL_FAIL,
    PRODUCT_LIST_ALL_REQUEST,
    PRODUCT_LIST_ALL_SUCCESS,
} from '../Constants/ProductConstants';
import { logout } from './userActions';

// PRODUCT LIST ALL
export const ListProductAll = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_ALL_REQUEST });
        const { data } = await axios.get(`/api/products/ProductAll`);
        dispatch({ type: PRODUCT_LIST_ALL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT LIST
export const listProduct =
    (category = '', keyword = '', pageNumber = '', rating = '', minPrice = '', maxPrice = '', sortProducts = '1') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(
                `/api/products?&category=${category}&keyword=${keyword}&pageNumber=${pageNumber}&rating=${rating}
        &minPrice=${minPrice}&maxPrice=${maxPrice}&sortProducts=${sortProducts}`,
            );
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT REVIEW CREATE
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/review`, review, config);
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};
