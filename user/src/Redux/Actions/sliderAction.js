import React from 'react'
import axios from 'axios'
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from '../Constants/SliderConstants'
export const ListSlider = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_REQUEST });
        const { data } = await axios.get(
            `/api/slider`
        )
        dispatch({ type: SLIDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: SLIDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }


}
