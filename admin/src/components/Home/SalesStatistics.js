import React from 'react';

const SaleStatistics = () => {
    return (
        <div className="col-xl-4 col-lg-12" style={{ flex: '0 0 49%', maxWidth: '60%' }}>
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Thống kê tổng doanh thu</h5>
                    {
                        <iframe
                            title="chart"
                            style={{
                                background: '#FFFFFF',
                                border: 'none',
                                borderRadius: '2px',
                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                                width: '100%',
                                height: '350px',
                            }}
                            // src="https://charts.mongodb.com/charts-baloshop-ivxlf/embed/charts?id=635ce449-8f1f-4e12-8e18-05b934c2d8b8&maxDataAge=3600&theme=light&autoRefresh=true"
                            src="https://charts.mongodb.com/charts-cdtt2_baloshopdb-vqmcm/embed/charts?id=64562610-9de2-433a-8624-81e03b08574e&maxDataAge=3600&theme=light&autoRefresh=true"
                        ></iframe>
                    }
                </article>
            </div>
        </div>
    );
};

export default SaleStatistics;
