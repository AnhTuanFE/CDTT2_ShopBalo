import {
    NEWS_LIST_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_GET_FAIL,
    NEWS_GET_REQUEST,
    NEWS_GET_SUCCESS,
} from '../Constants/NewsContants';

export const newsListReducer = (state = { news: [] }, action) => {
    switch (action.type) {
        case NEWS_LIST_REQUEST:
            return { loading: true, news: [...state.news] };
        case NEWS_LIST_SUCCESS:
            return {
                loading: false,
                news: action.payload,
            };
        case NEWS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//GET GET NEWS
export const getNewsReducer = (state = { detailNews: [] }, action) => {
    switch (action.type) {
        case NEWS_GET_REQUEST:
            return { loading: true };
        case NEWS_GET_SUCCESS:
            return {
                loading: false,
                detailNews: action.payload,
            };
        case NEWS_GET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
