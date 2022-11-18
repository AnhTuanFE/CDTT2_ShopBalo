import {
    ORDER_ADDRESS_MY_FAIL,
    ORDER_ADDRESS_MY_REQUEST,
    ORDER_ADDRESS_MY_RESET,
    ORDER_ADDRESS_MY_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_ALL_FAIL,
    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_RESET,
    ORDER_CREATE_REVIEW_REQUEST,
    ORDER_CREATE_REVIEW_SUCCESS,
    ORDER_CREATE_REVIEW_FAIL,
    ORDER_CREATE_REVIEW_RESET,
    ORDER_GET_REVIEW_REQUEST,
    ORDER_GET_REVIEW_SUCCESS,
    ORDER_GET_REVIEW_FAIL,
    ORDER_COMPLETE_USER_REQUEST,
    ORDER_COMPLETE_USER_SUCCESS,
    ORDER_COMPLETE_USER_FAIL,
    ORDER_COMPLETE_USER_RESET,
    ORDER_RETURN_AMOUNT_PRODUCT_REQUEST,
    ORDER_RETURN_AMOUNT_PRODUCT_SUCCESS,
    ORDER_RETURN_AMOUNT_PRODUCT_FAIL,
    ORDER_RETURN_AMOUNT_PRODUCT_RESET,
} from '../Constants/OrderConstants';

// CREATE ORDER
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE ORDER REVIEW
export const orderCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case ORDER_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, orderReview: action.payload };
        case ORDER_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER GET ITEM
export const orderGetItem = (state = {}, action) => {
    switch (action.type) {
        case ORDER_GET_REVIEW_REQUEST:
            return { ...state, loading: true };
        case ORDER_GET_REVIEW_SUCCESS:
            return { loading: false, itemOrder: action.payload };
        case ORDER_GET_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER PAY
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

// USER ORDERS
export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { loading: true };
        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_LIST_MY_RESET:
            return { orders: [] };
        default:
            return state;
    }
};

export const orderAddressMyReducer = (state = { orderAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_ADDRESS_MY_REQUEST:
            return { loading: true, orderAddress: {} };
        case ORDER_ADDRESS_MY_SUCCESS:
            return { loading: false, orderAddress: action.payload };
        case ORDER_ADDRESS_MY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_ADDRESS_MY_RESET:
            return { orderAddress: {} };
        default:
            return state;
    }
};

//ORDER LIST ALL
export const productbestseller = (state = { products: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_ALL_REQUEST:
            return { loading: true, products: [...state.products] };
        case ORDER_LIST_ALL_SUCCESS:
            return {
                products: action.payload,
            };
        case ORDER_LIST_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CANCEL_REQUEST:
            return { loading: true };
        case ORDER_CANCEL_SUCCESS:
            return { loading: false, success: true };
        case ORDER_CANCEL_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CANCEL_RESET:
            return {};
        default:
            return state;
    }
};

export const orderCompleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_COMPLETE_USER_REQUEST:
            return { loading: true };
        case ORDER_COMPLETE_USER_SUCCESS:
            return { loading: false, success: true };
        case ORDER_COMPLETE_USER_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_COMPLETE_USER_RESET:
            return {};
        default:
            return state;
    }
};

export const returnAmountProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_RETURN_AMOUNT_PRODUCT_REQUEST:
            return { loading: true };
        case ORDER_RETURN_AMOUNT_PRODUCT_SUCCESS:
            return { loading: false, success: true, returnAmount: action.payload };
        case ORDER_RETURN_AMOUNT_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_RETURN_AMOUNT_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};
