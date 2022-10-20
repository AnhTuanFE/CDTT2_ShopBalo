import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
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
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_LIST_COMMENT_ALL_FAIL,
    PRODUCT_LIST_COMMENT_ALL_SUCCESS,
    PRODUCT_LIST_COMMENT_ALL_REQUEST,
    PRODUCT_CREATE_COMMENTCHILD_FAIL,
    PRODUCT_CREATE_COMMENTCHILD_SUCCESS,
    PRODUCT_CREATE_COMMENTCHILD_RESET,
    PRODUCT_CREATE_COMMENTCHILD_REQUEST,
    PRODUCT_OPTIONCOLOR_REQUEST,
    PRODUCT_OPTIONCOLOR_SUCCESS,
    PRODUCT_OPTIONCOLOR_FAIL,
    PRODUCT_OPTIONCOLOR_RESET,
    PRODUCT_UPDATE_OPTION_REQUEST,
    PRODUCT_UPDATE_OPTION_SUCCESS,
    PRODUCT_UPDATE_OPTION_FAIL,
    PRODUCT_UPDATE_OPTION_RESET,
    PRODUCT_DELETE_OPTION_REQUEST,
    PRODUCT_DELETE_OPTION_SUCCESS,
    PRODUCT_DELETE_OPTION_FAIL,
    PRODUCT_DELETE_OPTION_RESET,
    PRODUCT_CREATE_IMAGE_REQUEST,
    PRODUCT_CREATE_IMAGE_SUCCESS,
    PRODUCT_CREATE_IMAGE_FAIL,
    PRODUCT_CREATE_IMAGE_RESET,
    PRODUCT_DELETE_IMAGE_REQUEST,
    PRODUCT_DELETE_IMAGE_SUCCESS,
    PRODUCT_DELETE_IMAGE_FAIL,
    PRODUCT_DELETE_IMAGE_RESET,
} from '../Constants/ProductConstants';

// ALL PRODUCTS
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
                countProducts: action.payload.countProducts,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// DELETE PRODUCT
export const productDeleteOptionReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_OPTION_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_OPTION_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_OPTION_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_OPTION_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE PRODUCT
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE PRODUCT
export const optionColorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_OPTIONCOLOR_REQUEST:
            return { loading: true };
        case PRODUCT_OPTIONCOLOR_SUCCESS:
            return { loading: false, success: true, optionColor: action.payload };
        case PRODUCT_OPTIONCOLOR_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_OPTIONCOLOR_RESET:
            return {};
        default:
            return state;
    }
};

// EDIT PRODUCT
export const productEditReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_EDIT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// UPDATE PRODUCT
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

// UPDATE OPTION PRODUCT
export const productOptionUpdateReducer = (state = { findOption: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_OPTION_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_OPTION_SUCCESS:
            return { loading: false, success: true, findOption: action.payload };
        case PRODUCT_UPDATE_OPTION_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_OPTION_RESET:
            return { product: {} };
        default:
            return state;
    }
};

//GET COMMENT PRODUCT
export const listProductCommentAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_COMMENT_ALL_REQUEST:
            return { loading: true, products: [...state.products] };
        case PRODUCT_LIST_COMMENT_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case PRODUCT_LIST_COMMENT_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT COMMENTCHILD CREATE
export const productCreateCommentChildReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_COMMENTCHILD_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_COMMENTCHILD_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_COMMENTCHILD_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_COMMENTCHILD_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT IMAGE CREATE
export const productCreateImageReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_IMAGE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_IMAGE_SUCCESS:
            return { loading: false, success: true, urlImages: action.payload };
        case PRODUCT_CREATE_IMAGE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_IMAGE_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT IMAGE DELETE
export const productDeleteImageReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_IMAGE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_IMAGE_SUCCESS:
            return { loading: false, success: true, deleteImage: 'xóa thành công' };
        case PRODUCT_DELETE_IMAGE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_IMAGE_RESET:
            return {};
        default:
            return state;
    }
};
