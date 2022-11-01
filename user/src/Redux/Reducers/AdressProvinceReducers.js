import { 
    PROVINCE_SUCCESS, 
    PROVINCE_FAIL
 } from "../Constants/AdressProvinceConstants";

export const Province = (state = {province: []}, action) => {
    switch (action.type) {
        case PROVINCE_SUCCESS:
        return {
            ...state,
            province: action.payload,
        };
        case PROVINCE_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
