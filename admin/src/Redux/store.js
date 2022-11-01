import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer, userdisabledReducer } from './Reducers/userReducers';
import {
    productCreateReducer,
    optionColorCreateReducer,
    productDeleteReducer,
    productEditReducer,
    productListReducer,
    productUpdateReducer,
    listProductCommentAllReducer,
    productCreateCommentChildReducer,
    productOptionUpdateReducer,
    productDeleteOptionReducer,
    productCreateImageReducer,
    productDeleteImageReducer,
} from './Reducers/ProductReducers';
import {
    orderCancelReducer,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPaidReducer,
    ordercompleteAdminReducer,
    orderwaitConfirmationReducer,
    orderListCompleteReducer,
} from './Reducers/OrderReducres';
import { sliderCreateReducer, sliderDeleteReducer, sliderListReducer } from './Reducers/SliderListReducers';
import {
    newsCreateReducer,
    newsDeleteReducer,
    newsListReducer,
    editNewsReducer,
    newsUpdateReducer,
} from './Reducers/NewsReduce';
import {
    categoryAddReducer,
    categoryDeleteReducer,
    categoryListReducer,
    categoryUpdateReducer,
} from './Reducers/CategoryReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userdisabled: userdisabledReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productOptionDelete: productDeleteOptionReducer,
    productCreate: productCreateReducer,
    optionColorCreate: optionColorCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    productOptionUpdate: productOptionUpdateReducer,
    productCommentGet: listProductCommentAllReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    productCreateImage: productCreateImageReducer,
    productDeleteImage: productDeleteImageReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliveredReducer,
    orderPaid: orderPaidReducer,
    orderCancel: orderCancelReducer,
    orderwaitGetConfirmation: orderwaitConfirmationReducer,
    orderGetcompleteAdmin: ordercompleteAdminReducer,
    orderListComplete: orderListCompleteReducer,
    sliderList: sliderListReducer,
    deleteSlider: sliderDeleteReducer,
    sliderCreate: sliderCreateReducer,
    newsList: newsListReducer,
    deleteNews: newsDeleteReducer,
    newsCreate: newsCreateReducer,
    getEditNews: editNewsReducer,
    newsUpdate: newsUpdateReducer,
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
