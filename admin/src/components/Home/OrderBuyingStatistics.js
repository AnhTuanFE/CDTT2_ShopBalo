import React from 'react';

const OrderBuyingStatistics = () => {
    return (
        <div className="col-xl-4 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Thống kê tổng số đơn đã Orders</h5>
                    <iframe
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '350px',
                        }}
                        src="https://charts.mongodb.com/charts-baloshop-ivxlf/embed/charts?id=635cef64-6434-4c6b-8200-9c6324679253&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
};

export default OrderBuyingStatistics;
