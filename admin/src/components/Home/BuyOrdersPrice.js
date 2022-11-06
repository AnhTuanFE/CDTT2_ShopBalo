import React from 'react';

const BuyOrdersPrice = () => {
    return (
        <div className="col-xl-4 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Thống kê tổng số tiền đã Orders</h5>
                    <iframe
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '350px',
                        }}
                        src="https://charts.mongodb.com/charts-baloshop-ivxlf/embed/charts?id=635cee24-09bd-4869-8b8c-a76c645fb3e5&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
};

export default BuyOrdersPrice;
