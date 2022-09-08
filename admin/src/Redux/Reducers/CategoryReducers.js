import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_RESET, CATEGORY_ADD_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_RESET, CATEGORY_DELETE_SUCCESS, CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_RESET, CATEGORY_UPDATE_SUCCESS } from "../Constants/CategoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return { loading: true, categories: [...state.categories] };
        case CATEGORY_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true};
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true};
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_DELETE_RESET:
            return {};
        default:
            return state;
    }
};


export const categoryAddReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_ADD_REQUEST:
            return { loading: true};
        case CATEGORY_ADD_SUCCESS:
            return { loading: false, success: true};
        case CATEGORY_ADD_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_ADD_RESET:
            return {}
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true};
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_UPDATE_RESET:
            return {}
        default:
            return state;
    }
};