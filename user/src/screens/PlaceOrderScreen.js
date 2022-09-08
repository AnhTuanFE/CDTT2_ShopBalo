import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFromCart, listCart } from '../Redux/Actions/cartActions';
import { createOrder } from '../Redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../Redux/Constants/OrderConstants';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import PayModal from '../components/Modal/PayModal';
import { getUserDetails } from '../Redux/Actions/userActions';

const PlaceOrderScreen = ({ history }) => {
    window.scrollTo(0, 0);
    // const userDetails = useSelector((state) => state.userDetails);
    // const { loading, user } = userDetails;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const currenCartItems = cartItems
        .filter((item) => item.isBuy == true)
        .reduce((arr, pro) => {
            arr.push({
                name: pro.product.name,
                qty: pro.qty,
                image: pro.product.image,
                price: pro.product.price,
                product: pro.product._id,
            });
            return arr;
        }, []);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    console.log(cart);
    cart.itemsPrice = addDecimals(
        cart.cartItems
            .filter((item) => item.isBuy == true)
            .reduce((a, i) => a + i.qty * i.product.price, 0)
            .toFixed(2),
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 0 ? (cart.itemsPrice > 100 ? 0 : 20) : 0);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice =
        cart?.cartItems.length > 0
            ? (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
            : 0;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    useEffect(() => {
        // dispatch(getUserDetails('profile'));
        dispatch(listCart());
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [history, dispatch, success, order]);

    const placeOrderHandler = () => {
        //if (window.confirm("Are you sure"))
        dispatch(
            createOrder({
                orderItems: currenCartItems,
                // shippingAddress: cart.shippingAddress,
                shippingAddress: {
                    address: userInfo.address,
                    city: userInfo.city,
                    postalCode: '',
                    country: userInfo.country,
                },
                // paymentMethod: cart.paymentMethod,
                paymentMethod: 'Payment in cash',
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                phone: userInfo.phone,
            }),
        );
        dispatch(clearFromCart(userInfo._id));
    };
    console.log(cart);
    return (
        <>
            <Header />
            <div className="container">
                <PayModal
                    Title="PAY"
                    Body="Do you agree to pay?"
                    HandleSubmit={placeOrderHandler}
                    Close="modal"
                ></PayModal>
                <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                <div className="alert-success order-box fix-none">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9 fix-display">
                                <p>{`Name: ${userInfo.name}`}</p>
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
                                <p>Address: {`${userInfo?.city}, ${userInfo?.address}, ${userInfo?.country}`}</p>
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
                                    <p>Pay method: {'Payment in cash'}</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-12 fix-padding cart-scroll">
                        {cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">No product is selected</Message>
                        ) : (
                            <>
                                {cart.cartItems
                                    .filter((item) => item.isBuy == true)
                                    .map((item, index) => (
                                        <div className="order-product row" key={index}>
                                            <div className="col-md-3 col-6">
                                                <img src={item.product.image} alt={item.name} />
                                            </div>
                                            <div className="col-md-5 col-6 d-flex align-items-center">
                                                <Link to={`/products/${item.product}`}>
                                                    <h6>{item.product.name}</h6>
                                                </Link>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                <h4>QUANTITY</h4>
                                                <h6>{item?.qty}</h6>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                <h4>SUBTOTAL</h4>
                                                <h6>${item?.qty * item?.product?.price}</h6>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="row" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                    {/* total */}
                    <div className="col-lg-12 d-flex align-items-end flex-column subtotal-order">
                        <table className="table fix-bottom">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Products</strong>
                                    </td>
                                    <td>${cart.itemsPrice}</td>
                                    <td>
                                        <strong>Tax</strong>
                                    </td>
                                    <td>${cart.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Shipping</strong>
                                    </td>
                                    <td>${cart.shippingPrice}</td>

                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td>${cart.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    className="row"
                    style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px', marginBottom: '30px' }}
                >
                    {error && (
                        <div className="">
                            <Message variant="alert-danger">{error}</Message>
                        </div>
                    )}
                    <div className="col-lg-12 fix-right">
                        <div style={{ fontWeight: '600', paddingRight: '10px' }}>Total: ${cart.totalPrice}</div>
                        {cart.cartItems.length === 0 ? null : (
                            <button
                                type="submit"
                                //onClick={placeOrderHandler}
                                // type="button"
                                class="btn btn-primary pay-button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                PLACE ORDER
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
