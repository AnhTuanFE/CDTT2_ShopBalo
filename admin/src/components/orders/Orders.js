import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Orders = (props) => {
    const { orders } = props;
    let orderss = orders;
    const [status, setStatus] = useState('0');
    if (orderss) {
        if (status == '1') {
            orderss = orders.filter((i) => i.isPaid == false && i.isDelivered == false && i.cancel != 1);
        }
        if (status == '2') {
            orderss = orders.filter((i) => i.isPaid == false && i.isDelivered == true && i.cancel != 1);
        }
        if (status == '3') {
            orderss = orders.filter((i) => i.isPaid == false && i.isDelivered == true && i.cancel != 1);
        }
        if (status == '3') {
            orderss = orders.filter((i) => i.isPaid == true && i.isDelivered == true && i.cancel != 1);
        }
        if (status == '4') {
            orderss = orders.filter((i) => i.cancel == 1);
        }
    }
    console.log(orderss);
    const handleStatus = (value) => {
        setStatus(value.target.value);
    };
    return (
        <>
            <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" value={status} onChange={handleStatus}>
                    <option value={'0'}>All category</option>
                    <option value={'1'}>Awaiting confirm</option>
                    <option value={'2'}>Delivering</option>
                    <option value={'3'}>Paid</option>
                    <option value={'4'}>Cancel</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Date</th>
                        <th>Status</th>
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
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    <span className="badge rounded-pill alert-success">
                                        Paid At {moment(order.paidAt).format('MMM Do YY')}
                                    </span>
                                ) : (
                                    <span className="badge rounded-pill alert-danger">Awaiting payment</span>
                                )}
                            </td>
                            <td>{moment(order.createdAt).format('MMM Do YY')}</td>
                            <td>
                                {order?.cancel != 1 ? (
                                    order.isDelivered == true && order.isPaid == true ? (
                                        <span className="badge rounded-pill alert-success">Delivered</span>
                                    ) : order?.isDelivered ? (
                                        <span className="badge alert-warning">Delivering</span>
                                    ) : (
                                        <span className="badge alert-danger">Awaiting confirm</span>
                                    )
                                ) : (
                                    <span className="badge bg-dark">This order has been cancelled</span>
                                )}
                            </td>
                            <td className="d-flex justify-content-end align-item-center">
                                <Link to={`/order/${order._id}`} className="text-success">
                                    <i className="fas fa-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}

                    {/* Not paid Not delivered */}
                    {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
                </tbody>
            </table>
        </>
    );
};

export default Orders;
