import React from 'react';

const ContactInfo = () => {
    return (
        <div className="contactInfo container">
            <div className="row">
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <h5>Đường dây nóng 24/7</h5>
                        <p>0123456789</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h5>Trụ sở chính</h5>
                        <p>Quận Gò vấp - Thành phố Hồ Chí Minh</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-fax"></i>
                        </div>
                        <h5>Số Fax</h5>
                        <p>0123456789</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
