import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { listCart, saveShippingAddress } from '../Redux/Actions/cartActions';
import { listMyOrders, orderGetAddress } from '../Redux/Actions/OrderActions';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions';
import { ORDER_ADDRESS_MY_RESET } from '../Redux/Constants/OrderConstants';
import { USER_UPDATE_PROFILE_RESET } from '../Redux/Constants/UserContants';

const ShippingScreen = ({ history }) => {
    // window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const UpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess } = UpdateProfile;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            history.push('/payment');
        }
    }, [updatesuccess]);
    useEffect(() => {
        dispatch(getUserDetails('profile'));
    }, []);
    useEffect(() => {
        if (user.address != undefined) {
            setAddress(user.address);
            setCity(user.city);
            setCountry(user.country);
            setImage(user.image);
        }
    }, [dispatch, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, country }));
        dispatch(updateUserProfile({ id: user._id, address, city, country, image }));
    };
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <h4>Địa chỉ giao hàng</h4>
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type="submit">Tiếp tục</button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
