import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../LoadingError/Error';
import Toast from './../LoadingError/Toast';
import Loading from './../LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateUserPassword, updateUserProfile } from '../../Redux/Actions/userActions';
import isEmpty from 'validator/lib/isEmpty';
import { listCart } from '../../Redux/Actions/cartActions';

const ProfileTabs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploadProfile, setUploadProfile] = useState(true); //ghi chú
    const [uploadPassword, setUploadPassword] = useState(false); //ghi chú
    const [checkbox, setCheckbox] = useState('0');
    const toastId = React.useRef(null);
    const refProfile = useRef(); /// ghi chú
    const refSetPassword = useRef(); /// ghi chú
    const Toastobjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        successPass: updatesuccessPass,
        success: updatesuccess,
        loading: updateLoading,
        error: errorUpdate,
    } = userUpdateProfile;

    // xư lý phần cập nhật mật khẩu
    // function removeProfile() {
    //   refProfile.current.style.display("none")
    //   refSetPassword.current.style.display("block")

    // }
    // function setProfile() {
    //   refProfile.current.style.display("block")
    //   refSetPassword.current.style.display("none")

    // }

    function checkProfile() {
        let x = Number(checkbox);
        if (x === 0) {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        } else {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        }
    }
    function checkSetPassword() {
        let y = Number(checkbox);
        if (y === 0) {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        } else {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        }
    }
    // xư lý profile validate
    const [objProfile, setObjProfile] = useState({});
    function checkObjProfile() {
        const profileObj = {};
        if (isEmpty(name)) {
            profileObj.name = 'Please input your phone';
        }
        if (isEmpty(phone)) {
            profileObj.phone = 'Please input your phone';
        } else {
            if (isNaN(phone)) {
                profileObj.phone = 'Incorrect phone number';
            }
        }
        if (isEmpty(address)) {
            profileObj.address = 'Please input your address';
        }
        if (isEmpty(city)) {
            profileObj.city = 'Please input your city';
        }
        if (isEmpty(country)) {
            profileObj.country = 'Please input your country';
        }
        setObjProfile(profileObj);
        if (Object.keys(profileObj).length > 0) return false;
        return true;
    }
    // xử lý login validate profile upload
    const [objFormPass, setObjFromPass] = useState({});
    function checkPassword() {
        const passObj = {};
        if (isEmpty(oldPassword)) {
            passObj.oldPassword = 'Please input your Password';
        }
        if (isEmpty(password)) {
            passObj.password = 'Please input your Password';
        } else {
            if (password.length < 6) {
                passObj.password = 'Password must be at least 6 characters';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Please input your ConfirmPassword';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword = 'Password must be at least 6 characters';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'The password entered is incorrect';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }
    useEffect(() => {
        dispatch(listCart());
        if (!toast.isActive(toastId.current)) {
            if (updatesuccessPass === true) {
                toastId.current = toast.success('Password Updated', Toastobjects);
            }
        }
    }, [updatesuccessPass]);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setCity(user.city);
            setCountry(user.country);
        }
        if (errorUpdate) {
            toastId.current = toast.error(error, Toastobjects);
        }
    }, [dispatch, user]);

    // useEffect(() => {
    //   dispatch(updateUserProfile({ id: user._id, oldPassword, password }));
    // },[dispatch, success])
    const submitUpdateProfile = (e) => {
        e.preventDefault();
        if (!checkObjProfile()) return;
        dispatch(updateUserProfile({ id: user._id, name, email, phone, country, city, address }));

        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success('Profile Updated', Toastobjects);
        }
    };

    const submitUpdatePassword = (e) => {
        e.preventDefault();
        if (!checkPassword()) return; // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
        // // Password match
        // if (password !== confirmPassword) {
        //   if (!toast.isActive(toastId.current)) {
        //     toastId.current = toast.error("Password does not match", Toastobjects);
        //   }
        // } else {
        //   dispatch(updateUserProfile({ id: user._id, oldPassword, password }));

        //   if (!toast.isActive(toastId.current)) {
        //     if (updatesuccess && uploadPassword) {
        //       toastId.current = toast.success("Password Updated", Toastobjects);
        //     }
        //   }
        // }
        dispatch(updateUserPassword({ id: user._id, oldPassword, password }));

        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    };
    return (
        <>
            <Toast />
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            {updateLoading && <Loading />}
            <div className="row form-container">
                {/*Update profile*/}
                {/* nut check radio */}
                <div className="radio-check">
                    <from className="radio-from">
                        <div className="radio-from__flex">
                            <label for="profile" className={Number(checkbox) === 0 ? 'color' : ''}>
                                Upload Profile
                            </label>
                            <input
                                id="profile"
                                style={{ display: 'none' }}
                                name="checkProfilePass"
                                type="radio"
                                onClick={checkProfile}
                            ></input>
                        </div>
                        <div className="radio-from__flex">
                            <label for="pass" className={Number(checkbox) === 1 ? 'color' : ''}>
                                Set Password
                            </label>
                            <input
                                id="pass"
                                style={{ display: 'none' }}
                                name="checkProfilePass"
                                type="radio"
                                onClick={checkSetPassword}
                            ></input>
                        </div>
                    </from>
                </div>
                <div
                    ref={refProfile}
                    className={uploadProfile ? 'col-lg-12 col-md-12 col-sm-12 color' : 'col-lg-12 col-md-12 col-sm-12'}
                    style={{ display: uploadProfile ? 'block' : 'none' }}
                >
                    <form className="row  form-container" onSubmit={submitUpdateProfile}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-fn">UserName</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    // required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.name}</p>
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
                                    // required
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
                                    // required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.phone}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>Address</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    // required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.address}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>City</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={city}
                                    // required
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.city}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>country</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={country}
                                    // required
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.country}</p>
                            </div>
                        </div>
                        <div className="button-submit">
                            <button type="submit">Update Profile</button>
                        </div>
                    </form>
                </div>

                {/*Update password*/}
                <div
                    ref={refSetPassword}
                    className={uploadPassword ? 'col-lg-12 col-md-12 col-sm-12 color' : 'col-lg-12 col-md-12 col-sm-12'}
                    style={{ display: uploadPassword ? 'block' : 'none' }}
                >
                    {/* dòng này sơn nó in ra thống báo lỗi sơn nhớ sửa lại nhá */}
                    {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                    <form className="row  form-container" onSubmit={submitUpdatePassword}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-pass">Old Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => {
                                        objFormPass.oldPassword = ' ';
                                        setOldPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.oldPassword}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-pass">New Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        objFormPass.password = ' ';
                                        setPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.password}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-confirm-pass">Confirm Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        objFormPass.confirmPassword = ' ';
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.confirmPassword}</p>
                            </div>
                        </div>

                        <div className="button-submit">
                            <button type="submit">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileTabs;
