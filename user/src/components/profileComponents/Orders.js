import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
const Orders = (props) => {
    const { loading, error, orders } = props;
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
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Trạng thái</th>
                                        <th>Thời gian mua</th>
                                        <th>Tổng tiền</th>
                                        <th>Đánh giá</th>
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
                                                {/* {order.cancel != 1 ? (
                                                    order.isPaid ? (
                                                        <>Đã thanh toán</>
                                                    ) : (
                                                        <>Đang chờ thanh toán</>
                                                    )
                                                ) : (
                                                    <span className="btn-dark">Đơn hàng này đã bị hủy</span>
                                                )} */}

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
                                                {order?.completeUser ? 'Đã đánh giá' : 'Chưa đánh giá'}
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
