import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../../Redux/Actions/userActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';

const UserComponent = () => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    //hết
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Tài khoản người dùng</h2>
            </div>

            <div className="card mb-4">
                {/* Card */}
                <div className="card-body">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                            {users?.map((user) => (
                                <div className="col" key={user._id}>
                                    <div className="card card-user shadow-sm">
                                        <div className="card-header">
                                            <img
                                                className="img-md img-avatar"
                                                src={
                                                    user?.image === undefined ? './images/user.png' : `./${user?.image}`
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
