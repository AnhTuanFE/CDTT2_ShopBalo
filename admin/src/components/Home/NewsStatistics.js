import React from 'react';

export default function NewsStatistics() {
    return (
        <div className="col-xl-4 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Thống kê tin tức</h5>
                    <iframe
                        title="tin tức"
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '350px',
                        }}
                        src="https://charts.mongodb.com/charts-baloshop-ivxlf/embed/charts?id=63739159-ab5c-4224-8b45-19ef565e2ab4&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
}
