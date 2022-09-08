import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getOrderDetails, payOrder } from '../Redux/Actions/OrderActions';
import Loading from './../components/LoadingError/Loading';
import Message from './../components/LoadingError/Error';
import moment from 'moment';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../Redux/Constants/OrderConstants';

const OrderScreen = ({ match }) => {
    window.scrollTo(0, 0);
    const [sdkReady, setSdkReady] = useState(false);
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    const cancelOrderHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(cancelOrder(order));
        }
    };
    //gọi thêm userLogin để lấy số điện thoại
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        console.log({ order });
    }, [successCancel]);
    useEffect(() => {
        // const addPayPalScript = async () => {
        //   const { data: clientId } = await axios.get("/api/config/paypal");
        //   const script = document.createElement("script");
        //   script.type = "text/javascript";
        //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        //   script.async = true;
        //   script.onload = () => {
        //     setSdkReady(true);
        //   };
        //   document.body.appendChild(script);
        // };
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        }
        // else if (!order.isPaid) {
        // if (!window.paypal) {
        //   addPayPalScript();
        // } else {
        //   setSdkReady(true);
        // }
        // }
    }, [dispatch, orderId, order]);
    //[dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return (
        <>
            <Header />
            <div className="container">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="content-header"></div>
                        <div className="row  order-detail">
                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i class="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-sm-9 mb-lg-9 fix-display">
                                        <p>{`Name: ${order.user.name}`}</p>
                                        <p>{`Phone: ${userInfo.phone}`}</p>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}

                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div
                                    className="row"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                                >
                                    <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-sm-9 mb-lg-9">
                                        <p>
                                            Address:{' '}
                                            {`${order.shippingAddress.city}, ${order.shippingAddress.address}, ${order.shippingAddress.country}`}
                                        </p>
                                        {order.isDelivered ? (
                                            <div className="bg-info p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Start shipping from {moment(order.deliveredAt).calendar()}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-danger p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Awaiting delivery
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* 3 */}

                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i class="fab fa-paypal"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-sm-9 mb-lg-9">
                                        <p>
                                            <p>Pay method: {order.paymentMethod}</p>
                                        </p>
                                        {order.isPaid ? (
                                            <div className="bg-info p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Paid on {moment(order.paidAt).calendar()}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-danger p-2 col-12">
                                                <p className="text-white text-center text-sm-start">Awaiting payment</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row order-products justify-content-between" style={{ marginBottom: '30px' }}>
                            <div className="col-lg-8 fix-padding cart-scroll">
                                {order.orderItems.length === 0 ? (
                                    <Message variant="alert-info mt-5">Your order is empty</Message>
                                ) : (
                                    <>
                                        {order.orderItems.map((item, index) => (
                                            <div className="order-product row" key={index}>
                                                <div className="col-md-3 col-6">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className="col-md-5 col-6 d-flex align-items-center">
                                                    <Link to={`/products/${item.product}`}>
                                                        <h6>{item.name}</h6>
                                                    </Link>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                    <h4>QUANTITY</h4>
                                                    <h6>{item.qty}</h6>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                    <h4>SUBTOTAL</h4>
                                                    <h6>${item.qty * item.price}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            {/* total */}
                            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Products</strong>
                                            </td>
                                            <td>${order.itemsPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Shipping</strong>
                                            </td>
                                            <td>${order.shippingPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Tax</strong>
                                            </td>
                                            <td>${order.taxPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Total</strong>
                                            </td>
                                            <td>${order.totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    // !order.isPaid && (
                                    //   <div className="col-12">
                                    //     {loadingPay && <Loading />}
                                    //     <span>Đang chờ giao hàng</span>
                                    //     {

                                    //     /* {!sdkReady ? (
                                    //       <Loading />
                                    //     ) : (
                                    //       <PayPalButton
                                    //         amount={order.totalPrice}
                                    //         onSuccess={successPaymentHandler}
                                    //       />
                                    //     )} */}
                                    //   </div>
                                    // )
                                    order?.cancel != 1 ? (
                                        !order.isPaid &&
                                        (!order.isDelivered ? (
                                            <div className="col-12 bg-warning ">
                                                {loadingPay && <Loading />}
                                                <span className="">Awaiting confirm</span>
                                            </div>
                                        ) : (
                                            <div className="col-12">
                                                {loadingPay && <Loading />}
                                                <div className="bg-danger p-2 col-12">
                                                    <p className="text-white text-center text-sm-start">
                                                        Awaiting payment
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-white bg-dark p-2 col-12">
                                            This order has been cancelled
                                        </div>
                                    )
                                }
                                {order.isPaid && (
                                    <div className="col-12">
                                        {loadingPay && <Loading />}
                                        <div className="bg-success p-2 col-12">
                                            <p className="text-white text-center text-sm-start">Pay success</p>
                                        </div>
                                    </div>
                                )}
                                {!order?.isDelivered && (
                                    <div className="col-lg-12 " style={{ paddingTop: '25px' }}>
                                        <button
                                            onClick={cancelOrderHandler}
                                            className="btn btn-dark col-12"
                                            style={{ marginBottom: '15px' }}
                                            disabled={order?.isPaid || order?.cancel == 1}
                                        >
                                            CANCEL THIS ORDER
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default OrderScreen;
