import React, { useEffect, useState } from 'react';
import OrderDetailProducts from './OrderDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    cancelOrder,
    deliverOrder,
    getOrderDetails,
    paidOrder,
    waitConfirmationOrder,
    completeAdminOrder,
} from '../../Redux/Actions/OrderActions';
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
    const orderwaitGetConfirmation = useSelector((state) => state.orderwaitGetConfirmation);
    const { success: successwaitGetConfirmation } = orderwaitGetConfirmation;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { loading: loadingPaid, success: successPaid } = orderPaid;
    const orderGetcompleteAdmin = useSelector((state) => state.orderGetcompleteAdmin);
    const { success: successCompleteAdmin } = orderGetcompleteAdmin;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [
        dispatch,
        orderId,
        successDelivered,
        successPaid,
        successCancel,
        successwaitGetConfirmation,
        successCompleteAdmin,
    ]);

    const cancelOrderHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(cancelOrder(order));
        }
    };
    const [status, setStatus] = useState('0');
    useEffect(() => {
        if (status === '1' && order?.waitConfirmation !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(waitConfirmationOrder(order._id));
            } else {
                setStatus('0');
            }
        }
        if (status === '2' && order?.isDelivered !== true) {
            if (window.confirm('Đồng ý giao hàng')) {
                dispatch(deliverOrder(order));
            } else {
                setStatus('1');
            }
        }
        if (status === '3' && order?.isPaid !== true) {
            if (window.confirm('Đồng ý thanh toán')) {
                dispatch(paidOrder(order));
            } else {
                setStatus('2');
            }
        }
        if (status === '4' && order?.completeAdmin !== true) {
            if (window.confirm('Đồng ý hoàn tất')) {
                dispatch(completeAdminOrder(order._id));
            } else {
                setStatus('3');
            }
        }
    }, [status]);
    useEffect(() => {
        if (order?.waitConfirmation === true && order?.isDelivered !== true) {
            setStatus('1');
        }
        if (order?.isDelivered === true && order?.isPaid !== true) {
            setStatus('2');
        }
        if (order?.isPaid === true && order?.completeAdmin !== true) {
            setStatus('3');
        }
        if (order?.completeAdmin === true) {
            setStatus('4');
        }
    }, [order]);

    return (
        <section className="content-main">
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/orders" className="btn btn-dark text-white">
                        Quay lại
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {order?.cancel !== 1 && (
                            <>
                                <option value={'0'}>Lựa chọn...</option>
                                <option value={'1'}>Xác nhận</option>
                                {order?.waitConfirmation && <option value={'2'}>Giao hàng</option>}
                                {order?.waitConfirmation && order?.isDelivered && (
                                    <option value={'3'}>Thanh toán</option>
                                )}
                                {order?.waitConfirmation &&
                                    order?.isDelivered &&
                                    order?.isPaid &&
                                    order?.completeUser && <option value={'4'}>Hoàn tất</option>}
                            </>
                        )}
                    </select>
                </div>
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
                                    <b className="text-black">
                                        {moment(order?.createdAt).hours()}
                                        {':'}
                                        {moment(order?.createdAt).minutes() < 10
                                            ? `0${moment(order?.createdAt).minutes()}`
                                            : moment(order?.createdAt).minutes()}{' '}
                                        {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                    </b>
                                </span>
                                <br />
                                <small className="text-black mx-3 ">ID Đơn hàng: {order._id}</small>
                            </div>
                            {order?.cancel !== 1 && order?.waitConfirmation !== true ? (
                                <div className="col-lg-3 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                                    <button
                                        onClick={cancelOrderHandler}
                                        className="btn btn-dark col-12"
                                        style={{ marginBottom: '15px' }}
                                        disabled={order?.waitConfirmation}
                                    >
                                        Hủy đơn hàng này
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
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <OrderDetailProducts order={order} loading={loading} />
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
