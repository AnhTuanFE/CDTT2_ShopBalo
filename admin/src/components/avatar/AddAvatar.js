import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAvatar, ListAvatar } from '../../Redux/Actions/AvatarAction';
import { AVATAR_CREATE_RESET } from '../../Redux/Constants/AvatarConstants';
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
export default function AddAvatar() {
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
    const avatarCreate = useSelector((state) => state.avatarCreate);
    const { loading, error, avatar } = avatarCreate;
    useEffect(() => {
        if (avatar) {
            toast.success('Avatar Added', ToastObjects);
            dispatch({ type: AVATAR_CREATE_RESET });
            setUrl('');
        }
        dispatch(ListAvatar());
    }, [dispatch, avatar]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!checkUrl()) return;
        dispatch(createAvatar(url));
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
        </>
    );
}
