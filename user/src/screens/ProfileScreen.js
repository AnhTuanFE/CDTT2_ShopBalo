import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ProfileTabs from '../components/profileComponents/ProfileTabs';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
    // window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const userUpdate = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate } = userUpdate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [buleanProfile, setBuleanProfile] = useState(true);

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
                                        src={`/userProfile/${userInfo?.image}` || './images/user.png'}
                                        alt=""
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '100%',
                                            objectFit: 'cover',
                                            flexShrink: '0',
                                            marginBottom: '5px',
                                        }}
                                        className="fix-none"
                                    />
                                    {/* Nút button Avatar */}
                                </div>
                                <div className="col-md-8">
                                    <h5 className="author-card-name mb-2">
                                        <strong>{userInfo.name}</strong>
                                    </h5>
                                    <span className="author-card-position">
                                        <>Ngày tham gia: {moment(userInfo.createdAt).format('DD/MM/YYYY')}</>
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
                                        style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        Hồ Sơ Cá Nhân
                                    </button>
                                    <button
                                        className="nav-link d-flex"
                                        style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                        <Link to="/byproduct">Danh Sách Mua Hàng</Link>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
