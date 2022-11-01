import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUser, disabledUser } from '../../Redux/Actions/userActions';
import { USER_DISABLED_RESET } from '../../Redux/Constants/UserContants';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const UserComponent = () => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const userdisabled = useSelector((state) => state.userdisabled);
    const { userNoti, error: errorDisabled } = userdisabled;
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);
    useEffect(() => {
        if (userNoti?.disabled) {
            toast.success('Bạn đã khóa tài khoản thành công', ToastObjects);
            dispatch(listUser());
        }
        if (userNoti?.disabled === false) {
            toast.success('Tài khoản đã được mở khóa thành công', ToastObjects);
            dispatch(listUser());
        }
        if (errorDisabled === 'error') {
            toast.error('Không thể thao tác tài khoản này', ToastObjects);
        }
        if (errorDisabled === 'true') {
            toast.error('Bạn đã khóa tài khoản này rồi', ToastObjects);
        }
        if (errorDisabled === 'false') {
            toast.error('Tài khoản này đã được mở khóa rồi', ToastObjects);
        }
        dispatch({ type: USER_DISABLED_RESET });
    }, [userNoti, errorDisabled]);

    const onDisabled = (id, disabled) => {
        if (window.confirm('Bạn có muốn khóa tài khoản này không')) {
            dispatch(disabledUser(id, disabled));
        }
    };
    const offDisabled = (id, disabled) => {
        if (window.confirm('Bạn có muốn mở khóa tài khoản này không')) {
            dispatch(disabledUser(id, disabled));
        }
    };
    //hết
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Tài khoản người dùng</h2>
            </div>
            <div className="card mb-4">
                {/* Card */}
                <div className="card-body">
                    <Toast />
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                            {users?.map((user) => (
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3" key={user._id}>
                                    <div className="card card-user shadow-sm">
                                        <div style={{ backgroundColor: '#9dd3f1' }}>
                                            <div className="dropdown">
                                                <button data-bs-toggle="dropdown" className="btn btn-light">
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            onDisabled(user._id, true);
                                                        }}
                                                    >
                                                        Khóa tài khoản
                                                    </button>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            offDisabled(user._id, false);
                                                        }}
                                                    >
                                                        Mở tài khoản
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                            <img
                                                className={`img-md img-avatar ${user.disabled ? 'opacity-25' : ''}`}
                                                src={
                                                    user?.image === undefined
                                                        ? '/images/user.png'
                                                        : `/userProfile/${user?.image}`
                                                }
                                                alt="User pic"
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title mt-5">{user.name}</h5>
                                            <div className="card-text text-muted">
                                                {user.isAdmin === true ? (
                                                    <p className="m-0">Admin</p>
                                                ) : (
                                                    <p className="m-0">Khách hàng</p>
                                                )}

                                                <p>
                                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserComponent;
