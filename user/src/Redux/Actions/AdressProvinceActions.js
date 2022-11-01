import axios from "axios";
import { 
    PROVINCE_SUCCESS, 
    PROVINCE_FAIL
  } from "../Constants/AdressProvinceConstants";

export const ListProvince = () => async (dispatch) => {
    try {
        // dispatch({ type: PROVINCE_REQUEST })
        const { data } = await axios.get(`https://provinces.open-api.vn/api/?depth=3`);
        dispatch({ type: PROVINCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROVINCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}