import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Rating from '../components/homeComponents/Rating';
import { Link } from 'react-router-dom';
import Message from './../components/LoadingError/Error';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProductReview,
    listProductDetails,
    createProductComment,
    createProductCommentChild,
} from '../Redux/Actions/ProductActions';
import Loading from '../components/LoadingError/Loading';
import { PRODUCT_CREATE_REVIEW_RESET } from '../Redux/Constants/ProductConstants';
import moment from 'moment';
import { addToCart } from '../Redux/Actions/cartActions';
import { listProduct } from '../Redux/Actions/ProductActions';
import { listUser } from '../Redux/Actions/userActions';
import OfferProduct from '../components/SlideCorousel/offerProduct';
import './style/SingleProduct.css';

const SingleProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortProducts, setSortProducts] = useState('3');
    const [bulean, setBulean] = useState(false);
    const [question, setQuestion] = useState('');
    const [questionChild, setQuestionChild] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [buleanReview, setBuleanReview] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [amountProduct, setAmountProduct] = useState('');

    const productId = match.params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const productCommentCreate = useSelector((state) => state.productCommentCreate); //comment
    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate); //comment child
    const productList = useSelector((state) => state.productList);
    const { products, page, pages } = productList;
    const userList = useSelector((state) => state.userAll);
    const { users } = userList;
    const commentsSort = product?.comments?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    const reviewsSort = product.reviews?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;
    //comment
    const {
        loading: loadingCreateComment,
        error: errorCreateComment,
        success: successCreateComment,
    } = productCommentCreate;
    //comment child
    const {
        loading: loadingCreateCommentChild,
        error: errorCreateCommentChild,
        success: successCreateCommentChild,
    } = productCommentChildCreate;
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);
    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch, successCreateComment, successCreateCommentChild]);
    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch, productId]);
    useEffect(() => {
        if (bulean) {
            // alert('Review Submitted');
            setBulean(false);
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(productId));
    }, [bulean]);
    useEffect(() => {
        if (product._id !== undefined) {
            setCategory(product.category);
            setMinPrice(Math.floor(product.price / 2));
            setMaxPrice(Math.round(product.price * 2));
        }
    }, [product._id]);
    useEffect(() => {
        if (product !== undefined) {
            dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts));
        }
    }, [category]);

    const arrStar = [5, 4, 3, 2, 1];
    const reviewCart = product.reviews;
    const returnStar = arrStar.map((star) => {
        let review = reviewCart.filter((rev) => {
            return star === rev.rating;
        });
        star = {
            rating: star,
            numReview: review.length,
            percentage: (review.length / (reviewCart.length === 0 ? 1 : reviewCart.length)) * 100,
        };
        return star;
    });
    const [mediumReview, setMediumReview] = useState();
    useEffect(() => {
        const medium = returnStar.reduce((total, num) => {
            return total + num.rating * num.numReview;
        }, 0);
        const sumReview = returnStar.reduce((total, num) => {
            return total + num.numReview;
        }, 0);
        let retult = ((medium / (5 * (sumReview === 0 ? 1 : sumReview))) * 5).toFixed(1);
        setMediumReview(retult);
    }, [reviewCart]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        if (userInfo) {
            dispatch(addToCart(productId, qty, userInfo._id));
            history.push(`/cart/${productId}?qty=${qty}`);
        } else history.push('/login');
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(productId, {
                rating,
                comment,
            }),
        );
    };

    //comment
    const submitComment = (e) => {
        e.preventDefault();
        //console.log(nameProduct, imageProduct, amountProduct, question);
        dispatch(createProductComment(productId, { nameProduct, imageProduct, amountProduct, question }));
        setQuestion('');
    };

    // quenstion child
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild(productId, { questionChild, reviewId }));
        setQuestionChild('');
    };
    function findProductUser(data) {
        const findUser = users?.find((user) => user._id === data.user);
        return (
            <img
                src={`/${findUser?.image}` || '/images/logo.png'} // upload ảnh
                alt=""
                style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    marginRight: '5px',
                }}
                className="fix-none"
            />
        );
    }
    return (
        <>
            <Header />
            <div className="container single-product">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-12 product-avatar">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="single-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                    </div>
                                    <div className="col-md-7 product-postion">
                                        <div className="product-dtl">
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                            </div>
                                            {/* <p>{product.description}</p> */}

                                            <div className="product-baner">
                                                <img
                                                    style={{ width: '100%' }}
                                                    src="https://m.media-amazon.com/images/S/aplus-media/vc/2b83d5b5-3c19-4578-8137-7e5094bbc801.__CR0,0,970,300_PT0_SX970_V1___.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="product-count col-lg-12 ">
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Giá</h6>
                                                    <span>{product.price}đ</span>
                                                </div>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Trạng thái</h6>
                                                    {product.countInStock > 0 ? (
                                                        <span>Còn hàng</span>
                                                    ) : (
                                                        <span>Hết hàng</span>
                                                    )}
                                                </div>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Đánh giá</h6>
                                                    <Rating
                                                        value={product.rating}
                                                        text={`${product.numReviews} đánh giá`}
                                                    />
                                                </div>
                                                {product.countInStock > 0 ? (
                                                    <>
                                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                                            <h6>Số lượng</h6>
                                                            <select
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button onClick={AddToCartHandle} className="round-black-btn">
                                                            Thêm vào giỏ
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-description">
                                        <h2>Description</h2>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* RATING */}
                            <div
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                                    paddingTop: '10px',
                                }}
                            >
                                <div className="col-md-12 col-sm-12">
                                    <h2 className="noti-view">Đánh giá & nhận xét</h2>
                                    <div style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
                                        <div className="row">
                                            <div className="col-md-4 col-sm-5 text-center pt-4">
                                                <div class="rating-box">
                                                    <h1 class="pt-4">{mediumReview}</h1>
                                                    <p class="">out of 5</p>
                                                </div>
                                                <div className="reviewMedium">
                                                    <Rating value={mediumReview} />
                                                </div>
                                                <p class="">{reviewCart.length} đánh giá và nhận xét</p>
                                            </div>
                                            <div class="col-md-8 col-sm-7">
                                                <div class="rating-bar0 justify-content-center">
                                                    <table class="text-left mx-auto">
                                                        {returnStar.map((star) => {
                                                            return (
                                                                <tr>
                                                                    <td class="rating-label">
                                                                        {star.rating}
                                                                        <span class="fa fa-star star-active mx-1"></span>
                                                                    </td>
                                                                    <td class="rating-bar">
                                                                        <div class="bar-container">
                                                                            <div
                                                                                class="bar-5"
                                                                                style={{
                                                                                    width: `${star.percentage}%`,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        {star.numReview} đánh giá
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonReview" style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <p>Bạn đánh giá sao sản phẩm này</p>
                                        <button
                                            type="submit"
                                            class="btn btn-primary pay-button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Đánh giá ngay
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-12 product-rating">
                                    <div
                                        class="modal fade"
                                        id="staticBackdrop"
                                        data-bs-backdrop="static"
                                        data-bs-keyboard="false"
                                        tabindex="-1"
                                        aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true"
                                    >
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header" style={{ padding: '0.5rem 1rem' }}>
                                                    <button
                                                        type="button"
                                                        class="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={() => {
                                                            setBulean(true);
                                                        }}
                                                    ></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div>
                                                        <h6
                                                            className="write-review text-center"
                                                            style={{ fontSize: '20px' }}
                                                        >
                                                            Đánh giá sản phẩm
                                                        </h6>
                                                        <div className="my-4">
                                                            {loadingCreateReview && <Loading />}
                                                            {errorCreateReview && (
                                                                <Message variant="alert-danger">
                                                                    {errorCreateReview}
                                                                </Message>
                                                            )}
                                                            {successCreateReview && (
                                                                <Message class="alert alert-primary">
                                                                    {successCreateReview}
                                                                </Message>
                                                            )}
                                                        </div>
                                                        {userInfo ? (
                                                            <form onSubmit={submitHandler}>
                                                                <div className="my-4">
                                                                    <strong>Đánh giá</strong>
                                                                    <select
                                                                        value={rating}
                                                                        onChange={(e) => setRating(e.target.value)}
                                                                        className="col-12 p-3 mt-2 border-0 rounded"
                                                                        style={{ backgroundColor: '#e9eaed80' }}
                                                                    >
                                                                        <option value="">Lựa chọn...</option>
                                                                        <option value="1">1 - Rất tệ</option>
                                                                        <option value="2">2 - Tệ</option>
                                                                        <option value="3">3 - Bình thường</option>
                                                                        <option value="4">4 - Tốt</option>
                                                                        <option value="5">5 - Rất tốt</option>
                                                                    </select>
                                                                </div>
                                                                <div className="my-4">
                                                                    <strong>Bình luận</strong>
                                                                    <textarea
                                                                        row="3"
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                        className="col-12 p-3 mt-2 border-0 rounded"
                                                                        style={{ backgroundColor: '#e9eaed80' }}
                                                                    ></textarea>
                                                                </div>
                                                                <div className="my-3">
                                                                    <button
                                                                        disabled={loadingCreateReview}
                                                                        className="col-12 bg-orange border-0 p-3 rounded text-white"
                                                                        type="submit"
                                                                    >
                                                                        <p>Gửi đánh giá</p>
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <div className="my-3">
                                                                <Message variant={'alert-warning'}>
                                                                    Làm ơn{' '}
                                                                    <Link to="/login">
                                                                        "{' '}
                                                                        <strong data-bs-dismiss="modal">
                                                                            Đăng nhập
                                                                        </strong>{' '}
                                                                        "
                                                                    </Link>{' '}
                                                                    và mua sản phẩm để đánh giá{' '}
                                                                </Message>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
                                    <div className="rating-review">
                                        {reviewsSort?.map((review) => (
                                            <div
                                                key={review._id}
                                                className="mb-2 mb-md-3 bg-light p-3 shadow-sm rounded-5"
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="rating-review__flex">
                                                        {findProductUser(review)}
                                                        <div className="review-rating">
                                                            <strong>{review.name}</strong>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <span>
                                                            {/* {moment(review.createdAt).calendar()} */}
                                                            {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                                            {moment(review.createdAt).hours()}
                                                            {':'}
                                                            {moment(review.createdAt).minutes() < 10
                                                                ? `0${moment(review.createdAt).minutes()}`
                                                                : moment(review.createdAt).minutes()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="alert alert-info mt-3">
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span
                                                            style={{
                                                                paddingRight: '5px',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                            }}
                                                        >
                                                            Đánh giá:{' '}
                                                        </span>
                                                        <Rating value={review.rating} />
                                                    </div>
                                                    <div>
                                                        <span
                                                            style={{
                                                                paddingRight: '5px',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                            }}
                                                        >
                                                            Nhận xét:
                                                        </span>{' '}
                                                        {review.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                                    paddingTop: '10px',
                                    marginTop: '15px',
                                }}
                            >
                                <h2 className="noti-view">Hỏi và đáp</h2>
                                <form
                                    onSubmit={submitComment}
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <textarea
                                        value={question}
                                        className="question-product"
                                        placeholder="Xin mời để lại câu hỏi, BaloStore sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                                        onChange={(e) => {
                                            setQuestion(e.target.value);
                                            setImageProduct(product.image);
                                            setNameProduct(product.name);
                                            setAmountProduct(product.countInStock);
                                        }}
                                    ></textarea>
                                    {userInfo ? (
                                        <button className="button">
                                            <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                                            Gửi
                                        </button>
                                    ) : (
                                        <div className="my-3 flex-padding">
                                            <Message variant={'alert-warning'}>
                                                <Link to="/login">
                                                    <strong
                                                        data-bs-dismiss="modal"
                                                        style={{ fontSize: '13px', padding: '0px 2px' }}
                                                    >
                                                        Đăng nhập
                                                    </strong>
                                                </Link>
                                            </Message>
                                        </div>
                                    )}
                                </form>
                                <div className="col-md-12 product-rating">
                                    <div className="rating-review">
                                        {errorCreateCommentChild && (
                                            <Message variant="alert-danger">{errorCreateCommentChild}</Message>
                                        )}
                                        {commentsSort?.map((review) => (
                                            <div key={review._id} className="mb-2 mb-md-2 p-3 rounded-5 backgroud">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="rating-review__flex">
                                                        {findProductUser(review)}
                                                        <div className="review-rating">
                                                            <strong>{review.name}</strong>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <span>
                                                            {/* {moment(review.createdAt).calendar()} */}
                                                            {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                                            {moment(review.createdAt).hours()}
                                                            {':'}
                                                            {moment(review.createdAt).minutes() < 10
                                                                ? `0${moment(review.createdAt).minutes()}`
                                                                : moment(review.createdAt).minutes()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="alert mt-3 product-review"
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <span>{review.question}</span>
                                                    <span
                                                        className="commentChild"
                                                        onClick={() => {
                                                            setReviewId(review._id);
                                                            setBuleanReview(review._id);
                                                        }}
                                                    >
                                                        <i
                                                            class="fas fa-comments-alt"
                                                            style={{ paddingRight: '5px' }}
                                                        ></i>
                                                        Trả lời
                                                    </span>
                                                </div>
                                                <div
                                                    className="product-review"
                                                    style={{ padding: '0px', boxShadow: 'none' }}
                                                >
                                                    {review.commentChilds?.map((child) => (
                                                        <div
                                                            key={child._id}
                                                            className="mb-2 mb-md-2 p-3 rounded-5 backgroud marginbottom"
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <div className="rating-review__flex">
                                                                    {findProductUser(child)}
                                                                    <div className="review-rating">
                                                                        <strong>{child.name}</strong>
                                                                    </div>
                                                                </div>
                                                                <div style={{ paddingLeft: '10px' }}>
                                                                    <span>
                                                                        {/* {moment(review.createdAt).calendar()} */}
                                                                        {moment(child.createdAt).format(
                                                                            'DD/MM/YYYY',
                                                                        )}{' '}
                                                                        {moment(child.createdAt).hours()}
                                                                        {':'}
                                                                        {moment(child.createdAt).minutes() < 10
                                                                            ? `0${moment(child.createdAt).minutes()}`
                                                                            : moment(child.createdAt).minutes()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="alert mt-3 product-review">
                                                                <span>{child.questionChild}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {buleanReview === review._id && (
                                                    <form
                                                        onSubmit={submitQuestionChild}
                                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                                    >
                                                        <textarea
                                                            className="question-product"
                                                            placeholder="Xin mời để lại câu hỏi, BaloStore sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                                                            value={questionChild}
                                                            onChange={(e) => {
                                                                setQuestionChild(e.target.value);
                                                            }}
                                                        ></textarea>
                                                        {userInfo ? (
                                                            <button className="button">
                                                                <i
                                                                    class="fas fa-paper-plane"
                                                                    style={{ paddingRight: '5px' }}
                                                                ></i>
                                                                Gửi
                                                            </button>
                                                        ) : (
                                                            <div className="my-3 flex-padding">
                                                                <Message variant={'alert-warning'}>
                                                                    <Link to="/login">
                                                                        <strong
                                                                            data-bs-dismiss="modal"
                                                                            style={{
                                                                                fontSize: '13px',
                                                                                padding: '0px 2px',
                                                                            }}
                                                                        >
                                                                            Đăng nhập
                                                                        </strong>
                                                                    </Link>
                                                                </Message>
                                                            </div>
                                                        )}
                                                    </form>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <OfferProduct products={products} />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SingleProduct;
