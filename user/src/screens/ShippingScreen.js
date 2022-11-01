import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { listCart, saveShippingAddress } from '../Redux/Actions/cartActions';
import { listMyOrders, orderGetAddress } from '../Redux/Actions/OrderActions';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions';
import { ORDER_ADDRESS_MY_RESET } from '../Redux/Constants/OrderConstants';
import { USER_UPDATE_PROFILE_RESET } from '../Redux/Constants/UserContants';
import Message from './../components/LoadingError/Error';
import { ListProvince } from '../Redux/Actions/AdressProvinceActions';
import './style/ShippingScreen.css'


const ShippingScreen = ({ history }) => {
    // window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const UpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess } = UpdateProfile;

    const userDetails = useSelector((state) => state.userDetails);


    const province = useSelector((state) => state.province);
    useEffect(()=> {
        dispatch(ListProvince())
    },[])
    const GetDataProvince = province.province;

// user lấy từ store
    const { loading, error, user } = userDetails;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');
    const [retult, setRetult] = useState('');
    const [distric, setDistric] = useState([]);

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

    const valitor = (values) => {
        const { address, city, country } = values;
        if (address === '' || city === '' || country === '') {
            setRetult('Vui lòng nhập đầy đủ thông tin');
        } else return true;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!valitor({ address, city, country })) return;
        dispatch(saveShippingAddress({ address, city, country }));
        dispatch(updateUserProfile({ id: user._id, address, city, country, image }));
        setRetult('');
    };

    const handleChooseProvince = (e) => 
    {
        const temp = e.target.value;
        const arrDistric =  GetDataProvince.find((arr) => {
            return arr.code == temp.toString()
        })
        // obiect
        setDistric(arrDistric)
        setCountry(arrDistric.name)
    }
    const handleChooseCiTy = (e)=> {
        setCity(e.target.value)
    }
    const GetDefaulDistrict = ()=> {
        const tamp = country
        const defaultDistric =  GetDataProvince.find((arr) => {
            return arr.name == tamp.toString()
        })
        setDistric(defaultDistric)
    }
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    {retult !== '' && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                    <h4>Địa chỉ giao hàng</h4>
                    <div className='wrapSelect'>
                        <select 
                            onChange={handleChooseProvince}
                            className='carSelect'
                            >
                            <option disabled selected hidden>{country}</option>
                            {
                                GetDataProvince.map((pro,index)=> (
                                    <option key={index} value={pro.code}>{pro.name}</option>
                                ))
                            }
                        </select>
    
                        <select
                            onChange={handleChooseCiTy}
                            className='carSelect'
                            onClick={GetDefaulDistrict}
                            >
                            <option disabled selected hidden>{city}</option>
                            {
                                distric?.districts
                                ?.map((dis,index)=> {
                                    return (<option key={index} >{dis.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <input
                    type="text"
                    placeholder="Đường/Hẻm - Thôn/Phường"
                    value={address}
                    // required
                    onChange={(e) => setAddress(e.target.value)}
                    />
                    <button type="submit">Tiếp tục</button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
