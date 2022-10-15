import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productCreateReviewReducer,
    productCreateCommentReducer,
    productCreateCommentChildReducer,
    productDetailsReducer,
    productListReducer,
    productListAllReducer,
    getAllCommentsReducer,
    getAllReviewsReducer,
} from './Reducers/ProductReducers';
import { cartReducer, CreateCartReducer, DeleteCartReducer } from './Reducers/CartReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userListReducer,
} from './Reducers/userReducers';
import {
    orderAddressMyReducer,
    orderCancelReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
    productbestseller,
    orderCreateReviewReducer,
    orderCompleteReducer,
    orderGetItem,
} from './Reducers/OrderReducres';
import { Sliderload } from './Reducers/SliderReducer';
import { Avatarload } from './Reducers/AvatarReducer';
import { getNewsReducer, newsListReducer } from './Reducers/NewsReducer';
import { categoryListReducer } from './Reducers/CategoryReducers';

const reducer = combineReducers({
    listAllOrder: productbestseller,
    productList: productListReducer,
    productAll: productListAllReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productCreateReviewReducer,
    productCommentCreate: productCreateCommentReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    getAllReviewsProduct: getAllReviewsReducer,
    getAllCommentsProduct: getAllCommentsReducer,
    cart: cartReducer,
    cartCreate: CreateCartReducer,
    cartDelete: DeleteCartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userAll: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderAddress: orderAddressMyReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderCancel: orderCancelReducer,
    orderCreateReviewsRetult: orderCreateReviewReducer,
    orderGetItemRetult: orderGetItem,
    orderGetComplete: orderCompleteReducer,
    sliderLoad: Sliderload,
    CategoryList: categoryListReducer,
    avatarLoad: Avatarload,
    listNews: newsListReducer,
    getDetailNews: getNewsReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

// login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
    cart: {
        cartItems: [],
        shippingAddress: [],
    },
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
