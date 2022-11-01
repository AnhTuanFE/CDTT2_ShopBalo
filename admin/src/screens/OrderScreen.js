import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import OrderMain from '../components/orders/OrderMain';

const OrderScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const status = match.params.status;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <OrderMain keyword={keyword} status={status} pageNumber={pageNumber} />
            </main>
        </>
    );
};

export default OrderScreen;
