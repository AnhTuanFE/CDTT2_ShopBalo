import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <Link to="/" className="brand-wrap">
                        <img
                            src="/images/logo2.png"
                            style={{ height: '64' }}
                            className="logo"
                            alt="Ecommerce dashboard template"
                        />
                    </Link>
                    <div>
                        <button className="btn btn-icon btn-aside-minimize">
                            <i className="text-muted fas fa-stream"></i>
                        </button>
                    </div>
                </div>

                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/" exact={true}>
                                <i className="icon fas fa-home"></i>
                                <span className="text">Trang chủ</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/products">
                                <i className="icon fas fa-shopping-bag"></i>
                                <span className="text">Các sản phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/addproduct">
                                <i className="icon fas fa-cart-plus"></i>
                                <span className="text">Thêm sản phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/category">
                                <i className="icon fas fa-list"></i>
                                <span className="text">Thể loại</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/orders">
                                <i className="icon fas fa-bags-shopping"></i>
                                <span className="text">Các đơn hàng</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/users">
                                <i className="icon fas fa-user"></i>
                                <span className="text">Người dùng</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/comment">
                                <i class="icon fas fa-comments"></i>
                                <span className="text">Bình luận</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link " to="/news">
                                <i class="icon fas fa-newspaper"></i>
                                <span className="text">Tin tức</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link " to="/addnews">
                                <i class="icon fas fa-newspaper"></i>
                                <span className="text">Thêm tin tức</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink activeClassName="active" className="menu-link" to="/slider">
                                <i className="icon fas fa-store-alt"></i>
                                <span className="text">Ảnh quảng cáo</span>
                            </NavLink>
                        </li>
                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
