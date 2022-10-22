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
import CancelModal from '../Modal/CancelModal';

const OrderDetailmain = (props) => {
    const { orderId } = props;
    const dispatch = useDispatch();
    // modal
    const {sta, setSta} = useState(true);

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

    // const deliverHandler = () => {
    //     if (window.confirm('Are you sure??')) {
    //         dispatch(deliverOrder(order));
    //     }
    // };

    const cancelOrderHandler = () => {
        if (window.confirm('Bạn có chắc muốn hủy đơn hàng này??')) {
            dispatch(cancelOrder(order));
        }
    };

    // const paidHandler = () => {
    //     if (window.confirm('Are you sure??')) {
    //         dispatch(paidOrder(order));
    //     }
    // };
    const [status, setStatus] = useState('0');
    useEffect(() => {
        if (status === '1' && order?.waitConfirmation !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(waitConfirmationOrder(order._id));
            }
        }
        if (status === '2' && order?.isDelivered !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(deliverOrder(order));
            }
        }
        if (status === '3' && order?.isPaid !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(paidOrder(order));
            }
        }
        if (status === '4' && order?.completeAdmin !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(completeAdminOrder(order._id));
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
    const cancelOrderHandler1 = () => {
        // dispatch(
        //     createOrder({
        //         orderItems: currenCartItems,
        //         // shippingAddress: cart.shippingAddress,
        //         shippingAddress: {
        //             address: userInfo.address,
        //             city: userInfo.city,
        //             postalCode: '',
        //             country: userInfo.country,
        //         },
        //         // paymentMethod: cart.paymentMethod,
        //         paymentMethod: 'Thanh toán bằng tiền mặt',
        //         itemsPrice: cart.itemsPrice,
        //         shippingPrice: cart.shippingPrice,
        //         taxPrice: cart.taxPrice,
        //         totalPrice: cart.totalPrice,
        //         phone: userInfo.phone,
        //     }),
        // );
    };
    return (
        <section className="content-main">
            <div className="content-header">
                 {/* {sta===true?<CancelModal
                        Title="Hủy đơn hàng"
                        Body="Bạn có chắc chắn hủy đơn hàng này không?"
                        HandleSubmit={cancelOrderHandler1}
                        Close="modal"
                    />} */}
                
                <div className="col-lg-9 col-md-9">
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
