import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_LIST_COMMENT_ALL_FAIL,
    PRODUCT_LIST_COMMENT_ALL_REQUEST,
    PRODUCT_LIST_COMMENT_ALL_SUCCESS,
    PRODUCT_CREATE_COMMENTCHILD_FAIL,
    PRODUCT_CREATE_COMMENTCHILD_REQUEST,
    PRODUCT_CREATE_COMMENTCHILD_SUCCESS,
    PRODUCT_OPTIONCOLOR_REQUEST,
    PRODUCT_OPTIONCOLOR_SUCCESS,
    PRODUCT_OPTIONCOLOR_FAIL,
    PRODUCT_UPDATE_OPTION_REQUEST,
    PRODUCT_UPDATE_OPTION_SUCCESS,
    PRODUCT_UPDATE_OPTION_FAIL,
    PRODUCT_DELETE_OPTION_REQUEST,
    PRODUCT_DELETE_OPTION_SUCCESS,
    PRODUCT_DELETE_OPTION_FAIL,
    PRODUCT_CREATE_IMAGE_REQUEST,
    PRODUCT_CREATE_IMAGE_FAIL,
    PRODUCT_CREATE_IMAGE_SUCCESS,
    PRODUCT_DELETE_IMAGE_REQUEST,
    PRODUCT_DELETE_IMAGE_SUCCESS,
    PRODUCT_DELETE_IMAGE_FAIL,
    PRODUCT_DELETE_COMMENT_FAIL,
    PRODUCT_DELETE_COMMENT_REQUEST,
    PRODUCT_DELETE_COMMENT_SUCCESS,
    PRODUCT_DELETE_COMMENTCHILD_REQUEST,
    PRODUCT_DELETE_COMMENTCHILD_SUCCESS,
    PRODUCT_DELETE_COMMENTCHILD_FAIL,
} from '../Constants/ProductConstants';
import axios from 'axios';
import { logout } from './userActions';

export const listProducts =
    (category = '', keyword = '', pageNumber = '') =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/products/admin?category=${category}&keyword=${keyword}&pageNumber=${pageNumber}`,
                config,
            );

            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: message,
            });
        }
    };

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

// DELETE PRODUCT OPTION
export const deleteOptionProduct = (productId, optionId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_OPTION_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/delete`, { optionId }, config);

        dispatch({ type: PRODUCT_DELETE_OPTION_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_OPTION_FAIL,
            payload: message,
        });
    }
};

// CREATE PRODUCT
export const createProduct =
    (name, price, description, category, image, countInStock) => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `/api/products/`,
                { name, price, description, category, image, countInStock },
                config,
            );

            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: message,
            });
        }
    };

//CREATE OPTION COLOR AND AMOUT
export const createOptionColor = (productId, option) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_OPTIONCOLOR_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products/${productId}`, option, config);

        dispatch({ type: PRODUCT_OPTIONCOLOR_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_OPTIONCOLOR_FAIL,
            payload: message,
        });
    }
};

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: message,
        });
    }
};

// UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/products/${product._id}`, product, config);

        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
};

//UPDATE OPTION PRODUCT
export const updateOptionProduct = (productId, option) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_OPTION_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/products/${productId}/option`, option, config);

        dispatch({ type: PRODUCT_UPDATE_OPTION_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_UPDATE_OPTION_FAIL,
            payload: message,
        });
    }
};

//GET COMMENT PRODUCT
export const ListProductCommentAll = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_COMMENT_ALL_REQUEST });
        const { data } = await axios.get(`/api/products/ProductCommentAll`);
        dispatch({ type: PRODUCT_LIST_COMMENT_ALL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_COMMENT_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT COMMENTCHILDS CREATE
export const createProductCommentChild = (productId, question) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_COMMENTCHILD_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/commentchild`, question, config);
        dispatch({ type: PRODUCT_CREATE_COMMENTCHILD_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_COMMENTCHILD_FAIL,
            payload: message,
        });
    }
};

export const createImageProduct = (images) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_IMAGE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post(`/api/imageProfile/`, images, config);

        dispatch({ type: PRODUCT_CREATE_IMAGE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_IMAGE_FAIL,
            payload: message,
        });
    }
};

export const deleteImageProduct = (productId, imageId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_IMAGE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products/${productId}/deleteImage`, { imageId }, config);

        dispatch({ type: PRODUCT_DELETE_IMAGE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_IMAGE_FAIL,
            payload: message,
        });
    }
};

export const deleteCommentsProduct = (productId, idComment) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_COMMENT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products/${productId}/deleteComment`, { idComment }, config);

        dispatch({ type: PRODUCT_DELETE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_COMMENT_FAIL,
            payload: message,
        });
    }
};

export const deleteCommentsChildProduct = (productId, idComment, idCommentChild) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_COMMENTCHILD_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/products/${productId}/deleteCommentChild`,
            { idComment, idCommentChild },
            config,
        );

        dispatch({ type: PRODUCT_DELETE_COMMENTCHILD_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_COMMENTCHILD_FAIL,
            payload: message,
        });
    }
};
