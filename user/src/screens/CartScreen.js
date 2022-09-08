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

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const cartDel = useSelector((state) => state.cartDelete);
    const { loading: loa, success: suc, mesage: mes } = cartDel;
    const cartCreate = useSelector((state) => state.cartCreate);
    const { loading: loadingCreate, success: successCreate } = cartCreate;
    const total = cartItems
        ? cartItems
              .filter((item) => item.isBuy == true)
              .reduce((a, i) => a + i.qty * i.product?.price, 0)
              .toFixed(2)
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
    return (
        <>
            <Header />
            {/* Cart */}
            <div className="container">
                {cartItems.length === 0 ? (
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
                                Back To Shop
                            </Link>
                        </div>
                        <div className=" alert alert-info text-center mt-3">
                            Total Cart Products
                            <Link className="text-success mx-2" to="/cart">
                                ({cartItems?.length ?? 0})
                            </Link>
                        </div>
                        {/* cartiterm */}
                        <div className="cart-scroll">
                            {cartItems?.map((item) => (
                                <div className="cart-iterm row">
                                    {item.product?.countInStock > 0 ? (
                                        <div className="col-md-1 cart-check">
                                            <input
                                                type="checkbox"
                                                checked={item.isBuy}
                                                onChange={(e) => {
                                                    dispatch(addToCart(item.product._id, true, userInfo._id));
                                                    // let check = -1;
                                                    // if (
                                                    //     currentChooseProduct.find((pr, i) => {
                                                    //         check = i;
                                                    //         return pr.product._id === item.product._id;
                                                    //     })
                                                    // ) {
                                                    //     currentChooseProduct.splice(check, 1);
                                                    // } else {
                                                    //     currentChooseProduct.push(item);
                                                    // }
                                                    // console.log(currentChooseProduct, 'Hi');
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
                                    <div className="cart-image col-md-2">
                                        <img src={item.product?.image} alt={item.product?.name} />
                                    </div>
                                    <div className="cart-text col-md-4 d-flex align-items-center">
                                        <Link to={`/products/${item.product?._id}`}>
                                            <h4>{item.product?.name}</h4>
                                        </Link>
                                    </div>
                                    <div className="cart-qty col-md-2 col-sm-5 mt-3 mt-md-0 d-flex flex-column justify-content-center quantity-css">
                                        <h6>QUANTITY</h6>
                                        <select
                                            disabled={item.product?.countInStock <= 0}
                                            value={item.qty}
                                            onChange={(e) => {
                                                dispatch(addToCart(item.product._id, e.target.value, userInfo._id));
                                            }}
                                        >
                                            {[...Array(item.product?.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7 quantity-css">
                                        <h6>PRICE</h6>
                                        <h4>${item.product?.price}</h4>
                                    </div>
                                    <div
                                        className=" col-md-1 delete-cart"
                                        onClick={() => {
                                            removeFromCartHandle(item.product._id);
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
                                <span className="sub">total:</span>
                                <span className="total-price">${total}</span>
                            </div>
                            {total > 0 && (
                                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                                    <button onClick={checkOutHandler}>Checkout</button>
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
