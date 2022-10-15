import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../Redux/Actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;
    useEffect(() => {
        $('[data-trigger]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var offcanvas_id = $(this).attr('data-trigger');
            $(offcanvas_id).toggleClass('show');
        });

        $('.btn-aside-minimize').on('click', function () {
            if (window.innerWidth < 768) {
                $('body').removeClass('aside-mini');
                $('.navbar-aside').removeClass('show');
            } else {
                // minimize sidebar on desktop
                $('body').toggleClass('aside-mini');
            }
        });
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="main-header navbar header-color">
            <div className="col-search"></div>
            <div className="col-nav">
                <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside">
                    <i className="md-28 fas fa-bars"></i>
                </button>
                <ul className="nav">
                    <li className="dropdown nav-item">
                        <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                            <img
                                className="img-xs"
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                }}
                                src={`/${userInfo?.image}` || '/images/user.png'}
                                alt="User"
                            />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link onClick={logoutHandler} className="dropdown-item text-danger" to="#">
                                Đăng xuất
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
