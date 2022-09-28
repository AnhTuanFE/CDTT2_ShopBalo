import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer } from './Reducers/userReducers';
import {
    productCreateReducer,
    productDeleteReducer,
    productEditReducer,
    productListReducer,
    productUpdateReducer,
    listProductCommentAllReducer,
    productCreateCommentChildReducer,
} from './Reducers/ProductReducers';
import {
    orderCancelReducer,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPaidReducer,
} from './Reducers/OrderReducres';
import { sliderCreateReducer, sliderDeleteReducer, sliderListReducer } from './Reducers/SliderListReducers';
import { avatarCreateReducer, avatarDeleteReducer, avatarListReducer } from './Reducers/AvatarReduce';
import {
    categoryAddReducer,
    categoryDeleteReducer,
    categoryListReducer,
    categoryUpdateReducer,
} from './Reducers/CategoryReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    productCommentGet: listProductCommentAllReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliveredReducer,
    orderPaid: orderPaidReducer,
    orderCancel: orderCancelReducer,
    sliderList: sliderListReducer,
    deleteSlider: sliderDeleteReducer,
    sliderCreate: sliderCreateReducer,
    avatarList: avatarListReducer,
    deleteAvatar: avatarDeleteReducer,
    avatarCreate: avatarCreateReducer,
    CategoryList: categoryListReducer,
    CategoryDelete: categoryDeleteReducer,
    CategoryAdd: categoryAddReducer,
    CategoryUpdate: categoryUpdateReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
