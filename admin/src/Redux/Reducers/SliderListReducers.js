import { SLIDER_CREATE_FAIL, SLIDER_CREATE_REQUEST, SLIDER_CREATE_RESET, SLIDER_CREATE_SUCCESS, SLIDER_DELETE_FAIL, SLIDER_DELETE_REQUEST, SLIDER_DELETE_SUCCESS, SLIDER_LIST_FAIL, SLIDER_LIST_REQUEST, SLIDER_LIST_SUCCESS } from "../Constants/SliderConstants";

export const sliderListReducer = (state = { slider: [] }, action) => {
    switch (action.type) {
      case SLIDER_LIST_REQUEST:
        return { loading: true, slider: [...state.slider] };
      case SLIDER_LIST_SUCCESS:
        return {
          loading: false,
          slider: action.payload,
        };
      case SLIDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const sliderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SLIDER_DELETE_REQUEST:
        return { 
          loading: true,  };
      case SLIDER_DELETE_SUCCESS:
        return { 
          loading: false, 
          success: true, };
      case SLIDER_DELETE_FAIL:
        return { loading: false,
           error: action.payload };
      default:
        return state;
    }
  };


  
  export const sliderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SLIDER_CREATE_REQUEST:
        return { loading: true };
      case SLIDER_CREATE_SUCCESS:
        return { loading: false, success: true, slider: action.payload };
      case SLIDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SLIDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
