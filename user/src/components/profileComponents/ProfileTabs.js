import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../LoadingError/Error';
import Toast from './../LoadingError/Toast';
import Loading from './../LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateUserPassword, updateUserProfile } from '../../Redux/Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Redux/Constants/UserContants';
import isEmpty from 'validator/lib/isEmpty';
import { listCart } from '../../Redux/Actions/cartActions';
import { ListAvatar } from '../../Redux/Actions/avatarAction';
import App from '../editAvatar/index';
import axios from 'axios';
// import Demo from '../editAvatar/index';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ImgDialog from '../editAvatar/ImgDialog';
import getCroppedImg from '../editAvatar/cropImage';
import '../editAvatar/style.css';
import { ListProvince } from '../../Redux/Actions/AdressProvinceActions';

const ProfileTabs = () => {
    const [distric, setDistric] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploadProfile, setUploadProfile] = useState(true); //ghi chú
    const [uploadPassword, setUploadPassword] = useState(false); //ghi chú
    const [checkbox, setCheckbox] = useState('0');
    const [checkFile, setCheckFile] = useState(true);
    const [checkImage, setCheckImage] = useState(false);
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
    const { loading, error, user, success: successDetail } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        successPass: updatesuccessPass,
        success: updatesuccess,
        loading: updateLoading,
        error: errorProfile,
    } = userUpdateProfile;

    const province = useSelector((state) => state.province);
    useEffect(() => {
        dispatch(ListProvince());
    }, []);
    const GetDataProvince = province.province;

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
            passObj.oldPassword = 'Vui lòng nhập mật khẩu cũ của bạn';
        }
        if (isEmpty(password)) {
            passObj.password = 'Vui lòng nhập mật khẩu';
        } else {
            if (password.length < 6) {
                passObj.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'Mật khẩu đã nhập không chính xác';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }
    useEffect(() => {
        if (!toast.isActive(toastId.current)) {
            if (updatesuccessPass === true) {
                toastId.current = toast.success('Mật khẩu cập nhật thành công', Toastobjects);
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
            }
        }
    }, [dispatch, updatesuccessPass]);
    useEffect(() => {
        if (updatesuccess) {
            toast.success('Cập nhật thông tin thành công', Toastobjects);
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, updatesuccess]);
    useEffect(() => {
        if (errorProfile === 'account lock up') {
            toast.error('Tài khoản của bạn đã bị khóa', Toastobjects);
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
        if (errorProfile !== undefined && errorProfile !== 'account lock up') {
            toast.error('Cập nhật không thành công', Toastobjects);
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, errorProfile]);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setCity(user.city);
            setCountry(user.country);
            setImage(user.image);
        }
        if (errorProfile) {
            toastId.current = toast.error(error, Toastobjects);
        }
    }, [dispatch, user, successDetail]);

    const submitUpdateProfile = (e) => {
        e.preventDefault();
        if (!checkObjProfile()) return;
        dispatch(updateUserProfile({ id: user._id, name, email, phone, country, city, address, image }));
    };
    const submitUpdatePassword = (e) => {
        e.preventDefault();
        if (!checkPassword()) return; // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
        dispatch(updateUserPassword({ id: user._id, oldPassword, password, image }));

        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    };

    //port avatar
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const [imgAvatar, setImgAvatar] = useState();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imgAvatar, croppedAreaPixels, rotation);
            setCroppedImage(croppedImage);
            let response = await fetch(croppedImage);
            let data = await response.blob();
            let metadata = {
                type: 'image/jpeg',
            };
            let newFile = new File([data], 'test.jpg', metadata);
            // ... do something with the file or return it
            setFile(newFile);
            setCheckImage(false);
            setCheckFile(true);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);
    useEffect(() => {
        if (file) {
            let newImage = new FormData();
            newImage.append('image', file);
            axios
                .post('/api/uploadAvatar', newImage, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    res?.data && setUrl(res?.data);
                });
        }
    }, [file]);
    useEffect(() => {
        if (url !== undefined) {
            setImage(url.filename);
        }
    }, [url]);

    // ================ đổi input = seclct
    const handleChooseProvince = (e) => {
        const temp = e.target.value;
        const arrDistric = GetDataProvince.find((arr) => {
            return arr.code == temp.toString();
        });
        // obiect
        setDistric(arrDistric);
        setCountry(arrDistric.name);
    };
    const handleChooseCiTy = (e) => {
        setCity(e.target.value);
    };
    const GetDefaulDistrict = () => {
        const tamp = country;
        const defaultDistric = GetDataProvince.find((arr) => {
            return arr.name == tamp.toString();
        });
        setDistric(defaultDistric);
    };

    // ================ đổi input = seclct

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
                                Thông Tin
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
                                Đổi Mật Khẩu
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
                    className={uploadProfile ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
                    style={{ display: uploadProfile ? 'block' : 'none' }}
                >
                    <form className="row  form-container" onSubmit={submitUpdateProfile}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-fn">Họ tên</label>
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
                                <label for="account-email">E-mail</label>
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
                                <label>Số điện thoại</label>
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

                        {/* ĐỔI TỪ ĐÂY */}
                        <div
                            className="col-md-12"
                            style={{
                                marginBottom: '32px',
                            }}
                        >
                            <div className="form">
                                <label>Tỉnh/Thành phố</label>
                                <select onChange={handleChooseProvince} className="carSelect">
                                    <option disabled selected hidden>
                                        {country}
                                    </option>
                                    {GetDataProvince.map((pro, index) => (
                                        <option key={index} value={pro.code}>
                                            {pro.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div
                            className="col-md-12"
                            style={{
                                marginBottom: '32px',
                            }}
                        >
                            <div className="form">
                                <label>Huyện/Quận</label>
                                <select onChange={handleChooseCiTy} className="carSelect" onClick={GetDefaulDistrict}>
                                    <option disabled selected hidden>
                                        {city}
                                    </option>
                                    {distric?.districts?.map((dis, index) => {
                                        return <option key={index}>{dis.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>Đường/Hẻm - Thôn/Phường</label>
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

                        <div className="button-submit">
                            <button style={{ backgroundColor: '#00483d' }} type="submit">
                                Cập nhật hồ sơ
                            </button>
                        </div>
                    </form>
                </div>

                {/*Update password*/}
                <div
                    ref={refSetPassword}
                    className={uploadPassword ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
                    style={{ display: uploadPassword ? 'block' : 'none' }}
                >
                    {/* dòng này sơn nó in ra thống báo lỗi sơn nhớ sửa lại nhá */}
                    {errorProfile && <Message variant="alert-danger">{errorProfile}</Message>}
                    <form className="row  form-container" onSubmit={submitUpdatePassword}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-pass">Mật khẩu cũ</label>
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
                                <label for="account-pass">Mật khẩu mới</label>
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
                                <label for="account-confirm-pass">Xác nhận mật khẩu</label>
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
                            <button style={{ backgroundColor: '#00483d' }} type="submit">
                                Cập nhật mật khẩu
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div
                        className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
                        style={checkFile === true ? {} : { display: 'none' }}
                    >
                        <img
                            src={
                                url?.filename === undefined
                                    ? user?.image === undefined
                                        ? '/images/user.png'
                                        : `/userProfile/${image}`
                                    : `/userProfile/${url?.filename}`
                            }
                            style={{
                                height: '120px',
                                width: '120px',
                                borderRadius: '100%',
                                objectFit: 'cover',
                                flexShrink: '0',
                            }}
                            alt=""
                        ></img>
                        <div className="text-center">
                            <input
                                id="id_file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    setImgAvatar(URL.createObjectURL(e.target.files[0]));
                                    setCheckFile(false);
                                    setCheckImage(true);
                                }}
                            ></input>
                            <label
                                for="id_file"
                                style={{
                                    marginTop: '5px',
                                    padding: '5px 10px',
                                    backgroundColor: '#eb7914',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    color: '#fff',
                                }}
                            >
                                Chọn ảnh
                            </label>
                        </div>
                    </div>
                    <div
                        className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
                        style={
                            checkImage === true
                                ? { position: 'absolute', height: '230px', width: '230px', background: '#cccccc42' }
                                : {
                                      display: 'none',
                                      position: 'absolute',
                                      height: '230px',
                                      width: '230px',
                                      background: '#cccccc42',
                                  }
                        }
                    >
                        <div>
                            <Cropper
                                image={imgAvatar}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={showCroppedImage}
                                variant="contained"
                                color="primary"
                                className="save-image"
                            >
                                Lưu ảnh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileTabs;
