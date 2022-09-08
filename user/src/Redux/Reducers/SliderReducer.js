import React from 'react';
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from '../Constants/SliderConstants';

export const Sliderload = (state = { slider: [] }, action) => {
    switch (action.type) {
        case SLIDER_REQUEST:
            return { loading: true, slider: [] };
        case SLIDER_SUCCESS:
            return {
                loading: false,
                slider: action.payload,
            };
        case SLIDER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
