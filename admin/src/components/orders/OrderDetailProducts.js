import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailProducts = (props) => {
    const { order, loading } = props;

    if (!loading) {
        // Calculate Price
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(0);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th style={{ width: '40%' }}>Sản phẩm</th>
                    <th style={{ width: '20%' }}>Đơn giá</th>
                    <th style={{ width: '20%' }}>Số lượng</th>
                    <th style={{ width: '20%' }} className="text-end">
                        Giá tiền
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.orderItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link className="itemside" to="#">
                                <div className="left">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '40px', height: '40px' }}
                                        className="img-xs"
                                    />
                                </div>
                                <div className="info">{item.name}</div>
                            </Link>
                        </td>
                        <td>{item.price}đ </td>
                        <td>{item.qty} </td>
                        <td className="text-end"> {item.qty * item.price}đ</td>
                    </tr>
                ))}

                <tr>
                    <td colSpan="4">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Tổng tiền:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    {order.itemsPrice}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Phí ship:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    {order.shippingPrice}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Tổng cộng:
                                </dt>
                                <dd className="fs-5" style={{ fontWeight: '600' }}>
                                    {order.totalPrice}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="text-muted fs-6" style={{ fontWeight: '600' }}>
                                    Trạng thái:
                                </dt>
                                <dd>
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
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderDetailProducts;
