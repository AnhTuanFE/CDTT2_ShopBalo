import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile, getUserDetails } from '../Redux/Actions/userActions';
import { listCart } from '../Redux/Actions/cartActions';
import { ListAvatar } from '../Redux/Actions/avatarAction';
import NavBar from './navbar';
import Suggestions from './suggestions/Suggestions';
import './suggestions/style.css';

const Header = (props) => {
    const { keysearch } = props;
    const [keyword, setKeyword] = useState('');
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { error } = userLogin;
    const userDetail = useSelector((state) => state.userDetails);
    const { user } = userDetail;

    const [checkScroll, setCheckScroll] = useState(false);
    const [key, setKey] = useState([]);

    useEffect(() => {
        const getSearch = JSON.parse(localStorage.getItem('keySearch'));
        if (getSearch !== null) {
            if (getSearch.length > 4) {
                getSearch.shift();
                setKey([...getSearch]);
            } else {
                setKey([...getSearch]);
            }
        }
    }, [keyword]);

    useEffect(() => {
        setKeyword(keysearch);
    }, [keysearch]);

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
                localStorage.setItem('keySearch', JSON.stringify([...key, keyword]));
                history.push(`/search/${keyword}`);
            } else {
                history.push('/');
            }
        }
    };

    useEffect(() => {
        dispatch(getUserDetails());
    }, [userInfo]);

    useEffect(() => {
        if (user?.disabled) {
            alert('Tài khoản đã bị khóa, vui lòng liên hệ sđt 6969 hay email nguvl@gmail.com để liên hệ lấy lại.');
            dispatch(logout());
            history.push('/');
        }
    }, [user]);

    function avatarUser() {
        const stringUser = userInfo.name;
        const value = stringUser.slice(0, 1);
        return value;
    }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    function notiUser() {
        let returnUser;
        const valueUser = userInfo.name;
        if (valueUser?.length > 15) {
            const arrayUser = valueUser.split(' ');
            returnUser = arrayUser[0];
        } else {
            returnUser = valueUser;
        }
        return returnUser;
    }

    window.addEventListener('scroll', () => {
        const x = Math.floor(window.pageYOffset);
        if (x > 300) {
            setCheckScroll(true);
        } else {
            setCheckScroll(false);
        }
    });

    const handlerScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <div>
                {/* Top Header */}
                <div className="Announcement ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center display-none">
                                <p>Đường dây nóng: 0123456789</p>
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
                                            <img alt="logo" src="/images/logo2.png" />
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
                                                    <Link
                                                        className="dropdown-item"
                                                        style={{
                                                            textTransform: 'capitalize',
                                                            fontSize: '12px',
                                                        }}
                                                        to="/profile"
                                                    >
                                                        Tài khoản của tôi
                                                    </Link>

                                                    <Link
                                                        className="dropdown-item"
                                                        style={{
                                                            textTransform: 'capitalize',
                                                            fontSize: '12px',
                                                        }}
                                                        to="#"
                                                        onClick={logoutHandler}
                                                    >
                                                        Đăng xuất
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
                                                    <Link
                                                        className="dropdown-item"
                                                        style={{ textTransform: 'capitalize' }}
                                                        to="/login"
                                                    >
                                                        Đăng nhập
                                                    </Link>

                                                    <Link
                                                        className="dropdown-item"
                                                        style={{ textTransform: 'capitalize' }}
                                                        to="/register"
                                                    >
                                                        Đăng kí
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
                                        <form onSubmit={submitHandler} className="input-group input-group__search">
                                            <input
                                                type="search"
                                                placeholder="Tìm kiếm"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                className="form-control rounded search button-search dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            />
                                            <button type="submit" className="search-button">
                                                <i className="fas fa-search submit-search"></i>
                                            </button>
                                            <div className="dropdown-menu input-group__search">
                                                <Suggestions />
                                            </div>
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
                                        <img alt="logo" src="/images/logo2.png" />
                                    </Link>
                                </div>
                                <div className="col-md-6 col-8 header-nav__search">
                                    <form onSubmit={submitHandler} className="input-group input-group__search">
                                        <input
                                            type="search"
                                            placeholder="Tìm kiếm"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            className="form-control rounded search button-search dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        />
                                        <button type="submit" className="search-button">
                                            <i className="fas fa-search submit-search"></i>
                                        </button>
                                        <div className="dropdown-menu input-group__search">
                                            <Suggestions />
                                        </div>
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
                                                <img
                                                    src={`/${
                                                        userInfo?.image === undefined
                                                            ? 'images/user.png'
                                                            : `userProfile/${userInfo?.image}`
                                                    }`} // upload ảnh
                                                    alt=""
                                                    style={{
                                                        height: '45px',
                                                        width: '45px',
                                                        borderRadius: '100%',
                                                        objectFit: 'cover',
                                                        flexShrink: '0',
                                                    }}
                                                    className="fix-none"
                                                />
                                                <span className="name-button__p ps-1">{notiUser()}</span>
                                                {/* {userInfo.name} */}
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link
                                                    className="dropdown-item"
                                                    style={{ textTransform: 'capitalize' }}
                                                    to="/profile"
                                                >
                                                    Tài khoản của tôi
                                                </Link>

                                                <Link
                                                    className="dropdown-item"
                                                    to="#"
                                                    style={{ textTransform: 'capitalize' }}
                                                    onClick={logoutHandler}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/register"
                                                style={{ textTransform: 'capitalize', fontWeight: '600' }}
                                            >
                                                Đăng kí
                                            </Link>
                                            <Link
                                                to="/login"
                                                style={{ textTransform: 'capitalize', fontWeight: '600' }}
                                            >
                                                Đăng nhập
                                            </Link>
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
            <div className="back-to-top" onClick={handlerScroll} style={checkScroll ? {} : { display: 'none' }}>
                <i class="fas fa-chevron-double-up"></i>
            </div>
        </>
    );
};

export default Header;
