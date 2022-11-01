import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFromCart, listCart } from '../Redux/Actions/cartActions';
import { createOrder } from '../Redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../Redux/Constants/OrderConstants';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import PayModal from '../components/Modal/PayModal';
import { toast } from 'react-toastify';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
import { getUserDetails } from '../Redux/Actions/userActions';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const PlaceOrderScreen = ({ history }) => {
    // window.scrollTo(0, 0);
    const dispatch = useDispatch();
    // const userDetails = useSelector((state) => state.userDetails);
    // const { loading, user } = userDetails;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const currenCartItems = cartItems
        .filter((item) => item.isBuy == true)
        .reduce((arr, pro) => {
            arr.push({
                name: pro.product.name,
                color: pro.color,
                qty: pro.qty,
                image: pro.product.image[0].image,
                price: pro.product.price,
                product: pro.product._id,
            });
            return arr;
        }, []);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(0);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems
            .filter((item) => item.isBuy == true)
            .reduce((a, i) => a + i.qty * i.product.price, 0)
            .toFixed(0),
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 0 ? (cart.itemsPrice > 100 ? 40000 : 20) : 0);
    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(0)));
    cart.totalPrice =
        cart?.cartItems.length > 0
            ? (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(0)
            : 0;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    useEffect(() => {
        if (error) {
            toast.error('Tài khoản của bạn đã bị khóa', Toastobjects);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [error]);
    useEffect(() => {
        dispatch(listCart());
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch(clearFromCart(userInfo._id));
        }
    }, [history, dispatch, success, order, userInfo]);

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
                paymentMethod: 'Thanh toán bằng tiền mặt',
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                phone: userInfo.phone,
                name: userInfo.name,
                email: userInfo.email,
            }),
        );
    };
    return (
        <>
            <Header />
            {error && <Loading />}
            <Toast />
            <div className="container">
                <PayModal
                    Title="Mua hàng"
                    Body="Bạn có đồng ý mua hay không?"
                    HandleSubmit={placeOrderHandler}
                    Close="modal"
                ></PayModal>
                <div
                    className="row  order-detail"
                    style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                >
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                <div className="alert-success order-box fix-none">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9 fix-display">
                                <p>{`Tên: ${userInfo.name}`}</p>
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
                                <p>Địa chỉ: {`${userInfo?.city}, ${userInfo?.address}, ${userInfo?.country}`}</p>
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
                                    <p>Phương thức: {'Thanh toán bằng tiền mặt'}</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-12 fix-padding cart-scroll">
                        {cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">Không có sản phẩm nào được chọn</Message>
                        ) : (
                            <>
                                {cart.cartItems
                                    .filter((item) => item.isBuy == true)
                                    .map((item, index) => (
                                        <div
                                            className="order-product row"
                                            key={index}
                                            style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                                        >
                                            <div className="col-md-2 col-6">
                                                <img
                                                    src={`/productImage/${item.product?.image[0].image}`}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="col-md-4 col-6 d-flex align-items-center">
                                                <Link to={`/products/${item.product}`}>
                                                    <h6>{item.product.name}</h6>
                                                </Link>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Phân loại hàng</h4>
                                                <h6>{item?.color}</h6>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Số lượng</h4>
                                                <h6>{item?.qty}</h6>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Giá</h4>
                                                <h6>{(item?.qty * item?.product?.price)?.toLocaleString('de-DE')}đ</h6>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="row" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                    {/* total */}
                    <div
                        className="col-lg-12 d-flex align-items-end flex-column subtotal-order"
                        style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                    >
                        <table className="table fix-bottom">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Sản phẩm</strong>
                                    </td>
                                    <td>{Number(cart?.itemsPrice)?.toLocaleString('de-DE')}đ</td>
                                    <td>
                                        <strong>Thuế</strong>
                                    </td>
                                    <td>{Number(cart?.taxPrice)?.toLocaleString('de-DE')}đ</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Phí vận chuyển</strong>
                                    </td>
                                    <td>{Number(cart?.shippingPrice)?.toLocaleString('de-DE')}đ</td>

                                    <td>
                                        <strong>Tổng tiền</strong>
                                    </td>
                                    <td>{Number(cart?.totalPrice)?.toLocaleString('de-DE')}đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    className="row"
                    style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px', marginBottom: '30px' }}
                >
                    <div className="col-lg-12 fix-right">
                        <div style={{ fontWeight: '600', paddingRight: '10px' }}>
                            Tổng tiền: {Number(cart.totalPrice)?.toLocaleString('de-DE')}đ
                        </div>
                        {cart.cartItems.length === 0 ? null : (
                            <button
                                type="submit"
                                //onClick={placeOrderHandler}
                                // type="button"
                                class="btn btn-primary pay-button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                Đặt hàng
                            </button>
                            
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
