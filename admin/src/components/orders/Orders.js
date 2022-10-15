import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Orders = (props) => {
    const { orders } = props;
    let orderss = orders;
    const [status, setStatus] = useState('0');
    if (orderss) {
        if (status === '1') {
            orderss = orders.filter((i) => i.waitConfirmation === false && i.cancel !== 1);
        }
        if (status === '2') {
            orderss = orders.filter((i) => i.waitConfirmation === true && i.isDelivered !== true && i.cancel !== 1);
        }
        if (status === '3') {
            orderss = orders.filter((i) => i.isDelivered === true && i.isPaid !== true && i.cancel !== 1);
        }
        if (status === '4') {
            orderss = orders.filter((i) => i.isPaid === true && i.completeAdmin !== true && i.cancel !== 1);
        }
        if (status === '5') {
            orderss = orders.filter((i) => i.completeUser === true && i.completeAdmin === true && i.cancel !== 1);
        }
        if (status === '6') {
            orderss = orders.filter((i) => i.cancel === 1);
        }
    }
    const handleStatus = (value) => {
        setStatus(value.target.value);
    };
    return (
        <>
            <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" value={status} onChange={handleStatus}>
                    <option value={'0'}>Lựa chọn...</option>
                    <option value={'1'}>Chờ xác nhận</option>
                    <option value={'2'}>Đã xác nhận</option>
                    <option value={'3'}>Giao hàng</option>
                    <option value={'4'}>Thanh toán</option>
                    <option value={'5'}>Hoàn tất</option>
                    <option value={'6'}>Hủy đơn</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col">Thời gian mua</th>
                        <th>Trạng thái</th>
                        <th scope="col" className="text-end">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orderss?.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <b>{order.user.name}</b>
                            </td>
                            <td>{order.user.email}</td>
                            <td>{order.totalPrice}đ</td>
                            <td>
                                {order.isPaid ? (
                                    <span className="badge rounded-pill alert-success">
                                        Thanh toán {moment(order?.paidAt).hours()}
                                        {':'}
                                        {moment(order?.paidAt).minutes() < 10
                                            ? `0${moment(order?.paidAt).minutes()}`
                                            : moment(order?.paidAt).minutes()}{' '}
                                        {moment(order?.paidAt).format('DD/MM/YYYY')}{' '}
                                    </span>
                                ) : (
                                    <span className="badge rounded-pill alert-danger">Chờ thanh toán</span>
                                )}
                            </td>
                            <td className="badge rounded-pill alert-success">
                                {moment(order?.createdAt).hours()}
                                {':'}
                                {moment(order?.createdAt).minutes() < 10
                                    ? `0${moment(order?.createdAt).minutes()}`
                                    : moment(order?.createdAt).minutes()}{' '}
                                {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                            </td>
                            <td>
                                {order?.cancel !== 1 ? (
                                    order?.waitConfirmation &&
                                    order?.isDelivered &&
                                    order?.isPaid &&
                                    order?.completeUser &&
                                    order?.completeAdmin ? (
                                        <span className="badge rounded-pill alert-success">Hoàn tất</span>
                                    ) : order?.waitConfirmation && order?.isDelivered && order?.isPaid ? (
                                        <span className="badge alert-success">Đã thanh toán</span>
                                    ) : order?.waitConfirmation && order?.isDelivered ? (
                                        <span className="badge alert-warning">Đang giao</span>
                                    ) : order?.waitConfirmation ? (
                                        <span className="badge alert-warning">Đã xác nhận</span>
                                    ) : (
                                        <span className="badge alert-danger">Chờ xác nhận</span>
                                    )
                                ) : (
                                    <span className="badge bg-dark">Đơn này đã bị hủy</span>
                                )}
                            </td>
                            <td className="d-flex justify-content-end align-item-center">
                                <Link to={`/order/${order._id}`} className="text-success">
                                    <i className="fas fa-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Orders;
