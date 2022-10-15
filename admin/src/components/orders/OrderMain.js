import React, { useEffect } from 'react';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Orders from './Orders';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../../Redux/Actions/OrderActions';

const OrderMain = () => {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    useEffect(() => {
        dispatch(listOrders());
    }, []);
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Orders</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : (
                            <Orders orders={orders} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;
