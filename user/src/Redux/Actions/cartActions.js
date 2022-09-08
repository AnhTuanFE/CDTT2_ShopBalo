import axios from 'axios';
import {
    CART_CLEAR_SUCCESS,
    CART_CREATE_FAIL,
    CART_CREATE_REQUEST,
    CART_CREATE_SUCCESS,
    CART_DELETE_FAIL,
    CART_DELETE_REQUEST,
    CART_DELETE_SUCCESS,
    CART_LIST_FAIL,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../Constants/CartConstants';
import { logout } from './userActions';

// ADD TO CART OLD
// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`);

//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data._id,
//       name: data.name,
//       image: data.image,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };
export const listCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/cart/${userInfo._id}`, config);
        localStorage.setItem('cartItems', JSON.stringify(data));

        dispatch({ type: CART_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_LIST_FAIL,
            payload: message,
        });
    }
};
//ADD TO CART NEW
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const { _id } = userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/cart/`, { productId, qty, _id }, config);
        dispatch({ type: CART_CREATE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_CREATE_FAIL,
            payload: message,
        });
    }
};

// REMOVE PRODUCT FROM CART
export const removefromcart = (pr) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const user = userInfo._id;
        await axios.post(
            `/api/cart/delete`,
            {
                user,
                pr,
            },
            config,
        );

        dispatch({ type: CART_DELETE_SUCCESS, payload: pr });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_DELETE_FAIL,
            payload: message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//Delete all item from cart
export const clearFromCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const user = userInfo._id;
        await axios.delete(`/api/cart/${user}`, config);

        dispatch({ type: CART_CLEAR_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_DELETE_FAIL,
            payload: message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
