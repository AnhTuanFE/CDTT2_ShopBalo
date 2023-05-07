import React, { useEffect, useState, useRef } from 'react';
import { updateUserProfile } from '../../Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
export default function UpdateProfile({ uploadProfile, setSucessft }) {
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess, loading: updateLoading, error: errorUpdate } = userUpdateProfile;

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const Toastobjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };
    const submitUpdateProfile = (e) => {
        e.preventDefault();

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
        dispatch(updateUserProfile({ id: user._id, name, email, phone }));
    };
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [dispatch, user, updatesuccess]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
        if (updatesuccess && uploadProfile && !error) {
            toast.success('Update Profile Success', Toastobjects);
        }
    }, [updatesuccess]);

    return (
        <>
            {loading && <Loading />}
            {updateLoading && <Loading />}
            {updatesuccess && <Message variant="alert-success">Update success</Message>}
            <form className="row  form-container" onSubmit={submitUpdateProfile}>
                <div className="col-md-12">
                    <div className="form">
                        <label for="account-fn">UserName</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label for="account-email">E-mail Address</label>
                        <input
                            className="form-control"
                            type="email"
                            disabled
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="text"
                            value={phone}
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="button-submit">
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </>
    );
}
