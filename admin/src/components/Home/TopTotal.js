import React from 'react';

const TopTotal = (props) => {
    const { orders, countProducts, countUsers } = props;
    let totalSale = 0;
    if (orders) {
        orders.map((order) => (order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null));
    }
    return (
        <div className="row">
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-primary">
                            <i className="text-primary fas fa-usd-circle"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng doanh số</h6>{' '}
                            <span className="fs-5" style={{ fontWeight: '600' }}>
                                {totalSale.toLocaleString('en-us', {minimumFractionDigits: 0})}đ
                            </span>
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">
                            <i className="text-success fas fa-bags-shopping"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng đơn hàng</h6>
                            {orders ? <span>{orders.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-warning">
                            <i className="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng sản phẩm</h6>
                            {countProducts ? <span>{countProducts}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">
                            <i className="text-success fas fa-user"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng tài khoản người dùng</h6>
                            {countUsers ? <span>{countUsers}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default TopTotal;
