import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
const Orders = (props) => {
    const { loading, error, orders } = props;

    const checkPay = (order) => {
        const itemProducts = order.orderItems;
        let productReview = itemProducts?.some((item) => item.productReview.length === 0);
        return <>{productReview ? 'Chưa đánh giá' : 'Đã đánh giá'}</>;
    };

    return (
        <div className=" d-flex justify-content-center align-items-center flex-column">
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <div className="col-12 alert alert-info text-center mt-3">
                            Không có đơn hàng nào
                            <Link
                                className="btn btn-success mx-2 px-3 py-2"
                                to="/"
                                style={{
                                    fontSize: '12px',
                                }}
                            >
                                BẮT ĐẦU MUA SẮM
                            </Link>
                        </div>
                    ) : (
                        <div className="table-responsive" style={{ overflowX: 'scroll' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="fw-normal fs-6">ID</th>
                                        <th className="fw-normal fs-6">Trạng thái</th>
                                        <th className="fw-normal fs-6">Thời gian mua</th>
                                        <th className="fw-normal fs-6">Tổng tiền</th>
                                        <th className="fw-normal fs-6">Đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr
                                            className={`${order.isPaid ? 'alert-success' : 'alert-color-white'}`}
                                            key={order._id}
                                        >
                                            <td>
                                                <a href={`/order/${order._id}`} className="link">
                                                    {order._id}
                                                </a>
                                            </td>
                                            <td>
                                                {order?.cancel !== 1 ? (
                                                    order?.waitConfirmation &&
                                                    order?.isDelivered &&
                                                    order?.isPaid &&
                                                    order?.completeUser &&
                                                    order?.completeAdmin ? (
                                                        <span
                                                            className="fs-6 text-success"
                                                            style={{ fontWeight: '600' }}
                                                        >
                                                            Hoàn tất
                                                        </span>
                                                    ) : order?.waitConfirmation &&
                                                      order?.isDelivered &&
                                                      order?.isPaid ? (
                                                        <span
                                                            className="fs-6 text-success"
                                                            style={{ fontWeight: '600' }}
                                                        >
                                                            Đã thanh toán
                                                        </span>
                                                    ) : order?.waitConfirmation && order?.isDelivered ? (
                                                        <span
                                                            className="fs-6 text-warning"
                                                            style={{ fontWeight: '600' }}
                                                        >
                                                            Đang giao
                                                        </span>
                                                    ) : order?.waitConfirmation ? (
                                                        <span
                                                            className="fs-6 text-warning"
                                                            style={{ fontWeight: '600' }}
                                                        >
                                                            Đã xác nhận
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="fs-6 text-warning"
                                                            style={{ fontWeight: '600' }}
                                                        >
                                                            Chờ xác nhận
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="fs-6" style={{ fontWeight: '600' }}>
                                                        Đơn này đã bị hủy
                                                    </span>
                                                )}
                                            </td>
                                            <td className="fs-6" style={{ fontWeight: '600' }}>
                                                {moment(order.createdAt).hours()}
                                                {':'}
                                                {moment(order.createdAt).minutes() < 10
                                                    ? `0${moment(order.createdAt).minutes()}`
                                                    : moment(order.createdAt).minutes()}{' '}
                                                {moment(order.createdAt).format('MM/DD/YYYY')}
                                            </td>
                                            <td>{order.totalPrice}đ</td>
                                            <td className="fs-6" style={{ fontWeight: '600' }}>
                                                {checkPay(order)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Orders;
