import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearFromCart, listCart, removefromcart } from './../Redux/Actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const color = location.search && location.search.split('=')[2];
    // console.log(color);

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    // console.log(cartItems, 'heheh');
    const cartDel = useSelector((state) => state.cartDelete);
    const { loading: loa, success: suc, mesage: mes } = cartDel;
    const cartCreate = useSelector((state) => state.cartCreate);
    const { loading: loadingCreate, success: successCreate } = cartCreate;
    const total = cartItems
        ? cartItems
              .filter((item) => item.isBuy == true)
              .reduce((a, i) => a + i.qty * i.product?.price, 0)
              .toFixed(0)
        : 0;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // useEffect(() => {
    //   if (productId) {
    //     console.log("1use")
    //     // dispatch(addToCart(productId, qty, userInfo._id))

    //   }

    //   // }, [dispatch, productId, qty]);
    // }, [dispatch, productId, qty]);
    const checkOutHandler = () => {
        history.push('/login?redirect=shipping');
    };
    useEffect(() => {
        dispatch(listCart());
    }, [suc, successCreate]);

    const removeFromCartHandle = (id) => {
        if (window.confirm('Are you sure!')) {
            dispatch(removefromcart(id));
        }
    };
    function findCartCountInStock(item) {
        const optionColor = item?.product?.optionColor;
        const findCart = optionColor?.find((option) => option.color === item.color);
        return (
            <>
                {findCart?._id !== '' ? (
                    <div className="col-md-1 cart-check">
                        <input
                            type="checkbox"
                            checked={findCart?.isBuy}
                            onChange={(e) => {
                                dispatch(addToCart(item?.product._id, item?.color, true, userInfo._id));
                            }}
                        ></input>
                    </div>
                ) : (
                    <div className="col-md-1 cart-check">
                        <span className="span" style={{ fontSize: '12px', color: 'red' }}>
                            Hết hàng
                        </span>
                    </div>
                )}
            </>
        );
    }
    function findCartColor(item) {
        const optionColor = item?.product?.optionColor;
        const findCart = optionColor?.find((option) => option.color === item.color);
        return (
            <>
                <div className="cart-qty col-md-2 col-sm-5 mt-3 mt-md-0 d-flex flex-column justify-content-center quantity-css">
                    <h6>Phân loại hàng</h6>
                    <h5>{item?.color}</h5>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-3 mt-md-0 d-flex flex-column justify-content-center quantity-css">
                    <h6>Số lượng</h6>
                    <select
                        disabled={findCart?.countInStock <= 0}
                        value={item?.qty}
                        onChange={(e) => {
                            // console.log(item?.product._id, 'hehehe');
                            dispatch(addToCart(item?.product._id, item?.color, e.target.value, userInfo._id));
                        }}
                    >
                        {[...Array(findCart?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            {/* Cart */}
            <div className="container">
                {cartItems?.length === 0 ? (
                    <div className=" alert alert-info text-center mt-3">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img
                                style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                            ></img>
                            Your shopping cart is empty
                        </div>
                        <Link
                            className="btn btn-success mx-5 px-5 py-3"
                            to="/"
                            style={{
                                fontSize: '12px',
                            }}
                        >
                            SHOPPING NOW
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="backTo" style={{ paddingTop: '10px' }}>
                            <Link to="/" className="col-md-6 ">
                                <i class="fas fa-undo" style={{ paddingRight: '5px' }}></i>
                                Về trang chủ
                            </Link>
                        </div>
                        <div className=" alert alert-info text-center mt-3">
                            Tổng sản phẩm trong giỏ
                            <Link className="text-success mx-2" to="/cart">
                                ({cartItems?.length ?? 0})
                            </Link>
                        </div>
                        {/* cartiterm */}
                        <div className="cart-scroll">
                            {cartItems?.map((item) => (
                                <div key={item?._id} className="cart-iterm row">
                                    {findCartCountInStock(item)}
                                    <div className="cart-image col-md-1">
                                        <img src={item.product?.image} alt={item.product?.name} />
                                    </div>
                                    <div className="cart-text col-md-3 d-flex align-items-center">
                                        <Link to={`/products/${item.product?._id}`}>
                                            <h4>{item.product?.name}</h4>
                                        </Link>
                                    </div>
                                    {findCartColor(item)}
                                    <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7 quantity-css">
                                        <h6>Giá</h6>
                                        <h4>{item.product?.price}đ</h4>
                                    </div>
                                    <div
                                        className=" col-md-1 delete-cart"
                                        onClick={() => {
                                            removeFromCartHandle(item?._id);
                                        }}
                                        style={{ display: 'flex', justifyContent: 'right', cursor: 'pointer' }}
                                    >
                                        Xóa
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* End of cart iterms */}
                        <hr />
                        <div className="cart-buttons d-flex align-items-center row">
                            <div className="total col-md-6">
                                <span className="sub">Tổng tiền:</span>
                                <span className="total-price">{total}đ</span>
                            </div>
                            {total > 0 && (
                                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                                    <button onClick={checkOutHandler}>Tiến hành thanh toán</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartScreen;
