import{CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS} from  "../Constants/CategoryConstants";

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
