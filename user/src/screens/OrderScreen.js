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
    // window.scrollTo(0, 0);
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
                                        <p>{`Tên: ${order.user.name}`}</p>
                                        <p>{`Số điện thoại: ${userInfo.phone}`}</p>
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
                                            Địa chỉ:{' '}
                                            {`${order.shippingAddress.city}, ${order.shippingAddress.address}, ${order.shippingAddress.country}`}
                                        </p>
                                        {order.isDelivered ? (
                                            <div className="bg-info p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Bắt đầu giao hàng vào {moment(order.deliveredAt).calendar()}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-danger p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Chờ giao hàng
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
                                            <p>Phương thức thanh toán: {order.paymentMethod}</p>
                                        </p>
                                        {order.isPaid ? (
                                            <div className="bg-info p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Đã thanh toán vào {moment(order.paidAt).calendar()}
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
                                    <Message variant="alert-info mt-5">ĐƠN HÀNG CỦA BẠN ĐANG TRỐNG</Message>
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
                                                    <h4>SỐ LƯỢNG</h4>
                                                    <h6>{item.qty}</h6>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                    <h4>TIỀN HÀNG</h4>
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
                                                <strong>Tiền hàng</strong>
                                            </td>
                                            <td>${order.itemsPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Phí vận chuyển</strong>
                                            </td>
                                            <td>${order.shippingPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Thuế</strong>
                                            </td>
                                            <td>${order.taxPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Tổng tiền</strong>
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
                                                <span className="">Đang chờ xác nhận</span>
                                            </div>
                                        ) : (
                                            <div className="col-12">
                                                {loadingPay && <Loading />}
                                                <div className="bg-danger p-2 col-12">
                                                    <p className="text-white text-center text-sm-start">
                                                        Đang chờ thanh toán
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-white bg-dark p-2 col-12">
                                            Đơn hàng đã bị hủy
                                        </div>
                                    )
                                }
                                {order.isPaid && (
                                    <div className="col-12">
                                        {loadingPay && <Loading />}
                                        <div className="bg-success p-2 col-12">
                                            <p className="text-white text-center text-sm-start">Thanh toán thành công</p>
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
                                            HỦY ĐƠN HÀNG
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
