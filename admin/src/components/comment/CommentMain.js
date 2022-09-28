import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListProductCommentAll, createProductCommentChild } from '../../Redux/Actions/ProductActions';
import moment from 'moment';
import { listUser } from '../../Redux/Actions/userActions';
import './style.css';

export default function CommentMain() {
    const dispatch = useDispatch();
    const commentList = useSelector((state) => state.productCommentGet);
    const { products } = commentList;
    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate);
    const {
        loading: loadingCreateCommentChild,
        error: errorCreateCommentChild,
        success: successCreateCommentChild,
    } = productCommentChildCreate;
    const [buleanReview, setBuleanReview] = useState('');
    const [productId, setProductId] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [questionChild, setQuestionChild] = useState('');
    useEffect(() => {
        dispatch(ListProductCommentAll());
    }, []);
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);
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
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild(productId, { questionChild, reviewId }));
    };
    return (
        <div className="content-main" style={{ backgroundColor: '#ffffff' }}>
            <div className="content-header">
                <h2 className="content-title" style={{ padding: '15px' }}>
                    Comment
                </h2>
            </div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                {products?.map((product, index) => {
                    return (
                        <div class="accordion-item" key={product._id}>
                            <h2 class="accordion-header" id={`panelsStayOpen-heading${index}`}>
                                <button
                                    class="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#panelsStayOpen-collapse${index}`}
                                    aria-expanded="true"
                                    aria-controls={`panelsStayOpen-collapse${index}`}
                                >
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Sản phẩm</th>
                                                <th scope="col">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img
                                                        src={product?.imageProduct}
                                                        alt=""
                                                        style={{ height: '40px', width: '40px' }}
                                                    />
                                                </td>
                                                <td>{product?.nameProduct}</td>
                                                <td>{product?.amountProduct}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </button>
                            </h2>
                            <div
                                id={`panelsStayOpen-collapse${index}`}
                                class="accordion-collapse collapse show"
                                aria-labelledby={`panelsStayOpen-heading${index}`}
                            >
                                <div class="accordion-body">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div className="rating-review__flex">
                                            {findProductUser(product)}
                                            <div className="product-rating">
                                                <strong>{product.name}</strong>
                                            </div>
                                        </div>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <span>
                                                {/* {moment(product.createdAt).calendar()} */}
                                                {moment(product.createdAt).format('DD/MM/YYYY')}{' '}
                                                {moment(product.createdAt).hours()}
                                                {':'}
                                                {moment(product.createdAt).minutes() < 10
                                                    ? `0${moment(product.createdAt).minutes()}`
                                                    : moment(product.createdAt).minutes()}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="alert mt-3 product-review"
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <span>{product.question}</span>
                                        <span
                                            className="commentChild"
                                            onClick={() => {
                                                setReviewId(product._id);
                                                setProductId(product.idProduct);
                                                setBuleanReview(product._id);
                                            }}
                                        >
                                            <i class="fas fa-comments-alt" style={{ paddingRight: '5px' }}></i>
                                            Trả lời
                                        </span>
                                    </div>
                                    <div className="product-review" style={{ padding: '0px', boxShadow: 'none' }}>
                                        {product.commentChilds?.map((child) => (
                                            <div
                                                key={child._id}
                                                className="mb-5 mb-md-3 bg-light p-1 shadow-sm rounded marginbottom"
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
                                                            {moment(child.createdAt).format('DD/MM/YYYY')}{' '}
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
                                    {buleanReview === product._id && (
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
                                            <button className="button">
                                                <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                                                Gửi
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
