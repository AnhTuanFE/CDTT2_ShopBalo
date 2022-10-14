import React, { useEffect } from 'react';
import OrderDetailProducts from './OrderDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, deliverOrder, getOrderDetails, paidOrder } from '../../Redux/Actions/OrderActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';

const OrderDetailmain = (props) => {
    const { orderId } = props;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    // const orderUser = useSelector((state) => state.orderPaid);
    // console.log(orderUser);
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { loading: loadingPaid, success: successPaid } = orderPaid;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        console.log(order);
    }, [dispatch, orderId, successDelivered, successPaid, successCancel]);

    const deliverHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(deliverOrder(order));
        }
    };

    const cancelOrderHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(cancelOrder(order));
        }
    };

    const paidHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(paidOrder(order));
        }
    };

    return (
        <section className="content-main">
            <div className="content-header">
                <Link to="/orders" className="btn btn-dark text-white">
                    Trở lại trang Đơn hàng
                </Link>
            </div>

            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div className="card">
                    <header className="card-header p-3 Header-white">
                        <div className="row align-items-center ">
                            <div className="col-lg-6 col-md-6">
                                <span>
                                    <i className="far fa-calendar-alt mx-2"></i>
                                    <b className="text-black">{moment(order.createdAt).format('llll')}</b>
                                </span>
                                <br />
                                <small className="text-black mx-3 ">ID Đơn hàng: {order._id}</small>
                            </div>
                            {order?.cancel != 1 && order?.isPaid != true ? (
                                <div className="col-lg-3 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                                    <button
                                        onClick={cancelOrderHandler}
                                        className="btn btn-dark col-12"
                                        style={{ marginBottom: '15px' }}
                                        disabled={order?.isPaid}
                                    >
                                        HỦY ĐƠN HÀNG
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </header>
                    <div className="card-body">
                        {/* Order info */}
                        <OrderDetailInfo order={order} />

                        <div className="row">
                            <div className="col-lg-9">
                                <div className="table-responsive">
                                    <OrderDetailProducts order={order} loading={loading} />
                                </div>
                            </div>
                            {/* Payment Info */}
                            <div className="col-lg-3">
                                <div className="shadow-sm bg-light">
                                    {order.isDelivered ? (
                                        <button className="btn btn-success col-12" style={{ marginBottom: '15px' }}>
                                            Bắt đầu giao hàng vào ( {moment(order.isDeliveredAt).format('MMM Do YY')})
                                        </button>
                                    ) : (
                                        <>
                                            {loadingDelivered && <Loading />}
                                            <button
                                                onClick={deliverHandler}
                                                className="btn btn-danger col-12"
                                                style={{ marginBottom: '15px' }}
                                                disabled={order?.cancel}
                                            >
                                                Xác nhận và giao hàng
                                            </button>
                                        </>
                                    )}

                                    {order.isPaid ? (
                                        <button className="btn btn-success col-12">
                                            Đã thanh toán vào ( {moment(order.isDeliveredAt).format('MMM Do YY')})
                                        </button>
                                    ) : (
                                        <>
                                            {loadingDelivered && <Loading />}
                                            <button
                                                onClick={paidHandler}
                                                className="btn btn-danger col-12"
                                                disabled={!order.isDelivered || order?.cancel}
                                            >
                                                Xác nhận thanh toán
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderDetailmain;
