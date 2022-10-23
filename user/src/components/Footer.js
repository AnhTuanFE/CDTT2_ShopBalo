import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Người phát triển</h1>
                        <ul className="footer-list">
                            <li>
                                <span>Nguyễn Anh Tuấn</span>
                            </li>
                            <li>
                                <span>Nguyễn Văn Lịch</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Theo dõi chúng tôi</h1>
                        <ul className="footer-list">
                            <li>
                                <a href="#">
                                    <i class="fab fa-facebook"></i>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-instagram"></i>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Liên hệ</h1>
                        <ul className="footer-list">
                            <li>
                                <i class="fas fa-phone-alt"></i>
                                <span className="fw-bold ps-1">Điện thoại: </span>0123456789
                            </li>
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span className="fw-bold ps-1">Địa chỉ: </span>
                                566/191 - Nguyễn Thái Sơn - Phường 5 - Gò Vấp - TP.HCM
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Chăm sóc khách hàng</h1>
                        <ul className="footer-list">
                            <li>
                                <a href="#">Trung tâm trợ giúp</a>
                            </li>
                            <li>
                                <a href="#">Hướng dẫn khách hàng</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
