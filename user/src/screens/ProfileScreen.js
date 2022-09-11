import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ProfileTabs from '../components/profileComponents/ProfileTabs';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions';
import Orders from './../components/profileComponents/Orders';
import moment from 'moment';
import { listMyOrders } from '../Redux/Actions/OrderActions';
import { ListAvatar } from '../Redux/Actions/avatarAction';
const ProfileScreen = () => {
    // window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const userUpdate = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate } = userUpdate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
    const [buleanProfile, setBuleanProfile] = useState(true);
    const [buleanOrder, setBuleanOrder] = useState(false);

    //get image
    const listAvatar = useSelector((state) => state.avatarLoad);
    const { avatar } = listAvatar;
    // console.log(userInfo, 'user infor');
    useEffect(() => {
        dispatch(ListAvatar());
    }, []);
    const userDetail = useSelector((state) => state.userDetails);
    const { user } = userDetail;
    //logic
    // const [valueAvatar, setValueAvatar] = useState();
    // const returnAvatar = avatar.find((avtar) => {
    //     if (userInfo.image !== undefined) {
    //         if (userInfo.image === avtar._id) {
    //             return true;
    //         }
    //     }
    // });
    // useEffect(() => {
    //     setValueAvatar(returnAvatar);
    // }, [returnAvatar]);
    //hết
    useEffect(() => {
        dispatch(listMyOrders());
        dispatch(getUserDetails('profile'));
    }, [dispatch, successUpdate]);

    return (
        <>
            <Header />
            <div className="container mt-lg-5 mt-3">
                <div className="row align-items-start">
                    <div className="col-lg-4 p-0 ">
                        <div className="author-card pb-0">
                            <div
                                className="row fix-culum"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    className="col-md-4"
                                    style={{
                                        marginTop: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        // src={valueAvatar === undefined ? './images/user.png' : valueAvatar.url} // upload ảnh
                                        src={user?.image?.url}
                                        alt="Lỗi"
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '50%',
                                            border: '1px solid #ccc',
                                            marginBottom: '5px',
                                        }}
                                        className="fix-none"
                                    />
                                    {/* Nút button Avatar */}
                                    <button
                                        type="submit"
                                        class="btn btn-primary pay-button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        style={{ fontSize: '14px' }}
                                    >
                                        Upload Avatar
                                    </button>
                                </div>
                                <div className="col-md-8">
                                    <h5 className="author-card-name mb-2">
                                        <strong>{userInfo.name}</strong>
                                    </h5>
                                    <span className="author-card-position">
                                        <>Joined {moment(userInfo.createdAt).format('LL')}</>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard pt-3 fix-top" style={{ marginTop: '10px' }}>
                            <div class="d-flex align-items-start">
                                <div
                                    class="nav align-items-start flex-column col-12 nav-pills me-3 "
                                    id="v-pills-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                >
                                    <button
                                        class={buleanProfile ? 'nav-link active color-red' : 'nav-link'}
                                        id="v-pills-home-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#v-pills-home"
                                        type="button"
                                        role="tab"
                                        aria-controls="v-pills-home"
                                        aria-selected="true"
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        onClick={() => {
                                            setBuleanProfile(true);
                                            setBuleanOrder(false);
                                        }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        Profile Settings
                                    </button>
                                    <button
                                        // class="nav-link d-flex"
                                        className={buleanOrder ? 'nav-link d-flex color-red' : 'nav-link d-flex'}
                                        id="v-pills-profile-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#v-pills-profile"
                                        type="button"
                                        role="tab"
                                        aria-controls="v-pills-profile"
                                        aria-selected="false"
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        onClick={() => {
                                            setBuleanProfile(false);
                                            setBuleanOrder(true);
                                        }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                        Orders List
                                        <span className="badge2">{orders ? orders.length : 0}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* panels */}
                    <div class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
                        <div
                            class="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                        >
                            <ProfileTabs />
                        </div>
                        <div
                            class="tab-pane fade"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                        >
                            <Orders orders={orders} loading={loading} error={error} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
