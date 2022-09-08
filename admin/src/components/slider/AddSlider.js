import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createSlider, ListSlider } from '../../Redux/Actions/SliderAction';
import { SLIDER_CREATE_RESET } from '../../Redux/Constants/SliderConstants';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import isEmpty from 'validator/lib/isEmpty';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
export default function AddSlider() {
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const [valueUrl, SetValueUrl] = useState({});
    const checkUrl = () => {
        const msg = {};
        let re = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (isEmpty(url)) {
            msg.url = 'Please input your url';
        } else {
            if (!re.test(url)) {
                msg.url = 'Please enter valid URL';
            }
        }
        SetValueUrl(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const sliderCreate = useSelector((state) => state.sliderCreate);
    const { loading, error, slider } = sliderCreate;
    useEffect(() => {
        if (slider) {
            toast.success('Slider Added', ToastObjects);
            dispatch({ type: SLIDER_CREATE_RESET });
            setUrl('');
        }
        dispatch(ListSlider());
    }, [dispatch, slider]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!checkUrl()) return;
        dispatch(createSlider(url));
    };
    return (
        <>
            <Toast />
            {error && (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {loading && <Loading />}
            <div class="input-group mb-3">
                <input
                    type="url"
                    class="form-control"
                    placeholder="Please type url"
                    aria-label="dsasd"
                    aria-describedby="basic-addon1"
                    required
                    value={url}
                    onClick={() => {
                        let x = { ...valueUrl };
                        SetValueUrl((x.url = ''));
                        return x;
                    }}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button" onClick={submitHandler}>
                        Add
                    </button>
                </div>
            </div>
            <p style={{ color: 'red' }}>{valueUrl.url}</p>

            {/* <form onSubmit={submitHandler} style={{ maxWidth: "1000px" }}>
        <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-8 shadow-sm ">
              <div className="card-body">
                <div className="mb-8 d-flex">
                  <label htmlFor="product_title" className="form-label">
                    URL BANNER
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_title"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ minWidth: 100 }}
                  >
                    ADD
                  </button>
                </div>
                <div></div>
                
              </div>
            </div>
          </div>
        </div>
      </form> */}
        </>
    );
}
