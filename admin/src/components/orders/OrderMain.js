import React, { useEffect } from 'react';
import Orders from './Orders';

const OrderMain = (props) => {
    const { keyword, status, pageNumber } = props;
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Đơn hàng</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <Orders keyword={keyword} status={status} pageNumber={pageNumber} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;
