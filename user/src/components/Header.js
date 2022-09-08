import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Actions/userActions';
import { listCart } from '../Redux/Actions/cartActions';
import NavBar from './navbar';

const Header = () => {
    const [keyword, setKeyword] = useState('');
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { error } = userLogin;

    const clickIconNavBar = () => {
        setNavbar(true);
    };
    const removeNavBar = () => {
        setNavbar(false);
    };
    const logoutHandler = () => {
        dispatch(logout());
        history.push('/');
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword !== undefined) {
            if (keyword.trim() && keyword) {
                history.push(`/search/${keyword}`);
            } else {
                history.push('/');
            }
        }
    };
    function avatarUser() {
        const stringUser = userInfo.name;
        const value = stringUser.slice(0, 1);
        return value;
    }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    function notiUser() {
        let returnUser;
        const valueUser = userInfo.name;
        if (valueUser.length > 15) {
            const arrayUser = valueUser.split(' ');
            returnUser = arrayUser[0];
        } else {
            returnUser = valueUser;
        }
        return returnUser;
    }

    return (
        <div>
            {/* Top Header */}
            <div className="Announcement ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center display-none">
                            <p>Hostline: 0123456789</p>
                        </div>
                        <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
                            <Link to="">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-youtube"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-pinterest-p"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="header">
                <div className="container">
                    {/* MOBILE HEADER */}
                    <div className="mobile-header">
                        <div className="container ">
                            <div className="row ">
                                <div className="col-6 d-flex align-items-center">
                                    <div className="moblie-menu" onClick={clickIconNavBar}>
                                        <i class="fas fa-bars"></i>
                                    </div>
                                    <Link className="navbar-brand" to="/">
                                        <img alt="logo" src="/images/logo.png" />
                                    </Link>
                                </div>
                                {navbar && <NavBar onRemove={removeNavBar}></NavBar>}
                                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                                    {userInfo ? (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i class="fas fa-user"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" to="/profile">
                                                    Profile
                                                </Link>

                                                <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i class="fas fa-user"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" to="/login">
                                                    Login
                                                </Link>

                                                <Link className="dropdown-item" to="/register">
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    <Link to="/cart" className="cart-mobile-icon">
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className="badge">{cartItems ? cartItems.length : 0}</span>
                                    </Link>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <form onSubmit={submitHandler} className="input-group">
                                        <input
                                            type="search"
                                            className="form-control rounded search"
                                            placeholder="Search"
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <button type="submit" className="search-button">
                                            <i className="fas fa-search submit-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="row">
                            <div className="col-md-3 col-4 d-flex align-items-center">
                                <Link className="navbar-brand" to="/">
                                    <img alt="logo" src="/images/logo.png" />
                                </Link>
                            </div>
                            <div className="col-md-6 col-8 header-nav__search">
                                <form onSubmit={submitHandler} className="input-group">
                                    <input
                                        type="search"
                                        className="form-control rounded search"
                                        placeholder="Search"
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button type="submit" className="search-button">
                                        <i className="fas fa-search submit-search"></i>
                                    </button>
                                </form>
                                <NavBar></NavBar>
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                {userInfo ? (
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="name-button dropdown-toggle name-button__user"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <div className="name-button__div">
                                                <span className="name-button__span">{avatarUser()}</span>
                                            </div>
                                            <span className="name-button__p">{notiUser()}</span>
                                            {/* {userInfo.name} */}
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to="/profile">
                                                Profile
                                            </Link>

                                            <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/register">Register</Link>
                                        <Link to="/login">Login</Link>
                                    </>
                                )}

                                <Link to="/cart">
                                    <i className="fas fa-shopping-bag"></i>
                                    <span className="badge">{cartItems ? cartItems?.length : 0}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
