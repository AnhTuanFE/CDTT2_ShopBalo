import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productCreateReviewReducer,
    productDetailsReducer,
    productListReducer,
    productListAllReducer,
} from './Reducers/ProductReducers';
import { cartReducer, CreateCartReducer, DeleteCartReducer } from './Reducers/CartReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from './Reducers/userReducers';
import {
    orderAddressMyReducer,
    orderCancelReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
    productbestseller,
} from './Reducers/OrderReducres';
import { Sliderload } from './Reducers/SliderReducer';
import { categoryListReducer } from './Reducers/CategoryReducers';

const reducer = combineReducers({
    listAllOrder: productbestseller,
    productList: productListReducer,
    productAll: productListAllReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productCreateReviewReducer,
    cart: cartReducer,
    cartCreate: CreateCartReducer,
    cartDelete: DeleteCartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderAddress: orderAddressMyReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderCancel: orderCancelReducer,
    sliderLoad: Sliderload,
    CategoryList: categoryListReducer,
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
