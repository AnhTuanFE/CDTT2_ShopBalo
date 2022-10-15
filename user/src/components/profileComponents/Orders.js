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
                                        <th>Ngày</th>
                                        <th>Tổng tiền</th>
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
                                                {order.cancel != 1 ? (
                                                    order.isPaid ? (
                                                        <>Đã thanh toán</>
                                                    ) : (
                                                        <>Đang chờ thanh toán</>
                                                    )
                                                ) : (
                                                    <span className="btn-dark">Đơn hàng này đã bị hủy</span>
                                                )}
                                            </td>
                                            <td>
                                                {order.isPaid
                                                    ? moment(order.paidAt).calendar()
                                                    : moment(order.createdAt).calendar()}
                                            </td>
                                            <td>${order.totalPrice}</td>
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
