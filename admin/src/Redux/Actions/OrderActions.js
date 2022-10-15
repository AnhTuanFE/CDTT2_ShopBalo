import {
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_COMPLETE_ADMIN_FAIL,
    ORDER_COMPLETE_ADMIN_REQUEST,
    ORDER_COMPLETE_ADMIN_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAID_FAIL,
    ORDER_PAID_REQUEST,
    ORDER_PAID_SUCCESS,
    ORDER_WAITCONFIRMATION_FAIL,
    ORDER_WAITCONFIRMATION_REQUEST,
    ORDER_WAITCONFIRMATION_SUCCESS,
} from '../Constants/OrderConstants';
import { logout } from './userActions';
import axios from 'axios';

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/all`, config);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${order._id}/delivered`, {}, config);
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: message,
        });
    }
};

//order PAID
export const paidOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAID_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${order._id}/paid`, {}, config);
        dispatch({ type: ORDER_PAID_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAID_FAIL,
            payload: message,
        });
    }
};

export const cancelOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CANCEL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/orders/${order._id}/cancel`, config);
        dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CANCEL_FAIL,
            payload: message,
        });
    }
};

export const waitConfirmationOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_WAITCONFIRMATION_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/waitConfirmation`, {}, config);
        dispatch({ type: ORDER_WAITCONFIRMATION_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_WAITCONFIRMATION_FAIL,
            payload: message,
        });
    }
};

export const completeAdminOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_COMPLETE_ADMIN_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/completeAdmin`, {}, config);
        dispatch({ type: ORDER_COMPLETE_ADMIN_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_COMPLETE_ADMIN_FAIL,
            payload: message,
        });
    }
};
