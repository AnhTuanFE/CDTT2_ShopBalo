import React from 'react';

const OrderDetailInfo = (props) => {
    const { order } = props;
    console.log(order);
    return (
        <div className="row mb-5 order-info-wrap">
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-user"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            Tên: {order.user.name} <br />
                            <p>Số ĐT: {order.phone}</p>
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-map-marker-alt"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            Địa chỉ: {order.shippingAddress.country}, {order.shippingAddress.city}
                            <br />
                            {order.shippingAddress.address}
                            <br />
                            {/* {order.shippingAddress.postalCode} */}
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext " style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fab fa-paypal"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">Phương thức thanh toán: {order.paymentMethod}</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default OrderDetailInfo;
