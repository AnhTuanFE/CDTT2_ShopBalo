import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { listCart } from '../../Redux/Actions/cartActions';
import FilterSection from './FilterSection';

const ShopSection = (props) => {
    const { category, keyword, pageNumber } = props;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortProducts, setSortProducts] = useState('1');
    const [keySearch, setKeySearch] = useState([]);

    useEffect(() => {
        const getSearch = JSON.parse(localStorage.getItem('keySearch'));
        if (getSearch !== null) {
            if (getSearch.length > 4) {
                getSearch.shift();
                setKeySearch([...getSearch]);
            } else {
                setKeySearch([...getSearch]);
            }
        }
    }, [products]);
    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts, keySearch));
    }, [dispatch, category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts]);

    return (
        <>
            <div className="container mt-2">
                <div className="section pt-0">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'right',
                            marginBottom: '10px',
                            marginRight: '10px',
                        }}
                    >
                        <div className="">
                            <select
                                className="form-select"
                                value={sortProducts}
                                onChange={(e) => {
                                    setSortProducts(e.target.value);
                                }}
                            >
                                <option style={{ fontSize: '13px' }} value="1">
                                    Sản phẩm mới
                                </option>
                                {/* <option value="2">Most prominent</option> */}
                                <option style={{ fontSize: '13px' }} value="3">
                                    Giá tăng dần
                                </option>
                                <option style={{ fontSize: '13px' }} value="4">
                                    Giá giảm dần
                                </option>
                            </select>
                        </div>
                        <div className="ms-2">
                            <select
                                className="form-select"
                                value={rating}
                                onChange={(e) => {
                                    setRating(e.target.value);
                                }}
                            >
                                <option style={{ fontSize: '13px' }} value="0">
                                    Đánh giá
                                </option>
                                <option style={{ fontSize: '13px' }} value="5">
                                    5 sao
                                </option>
                                <option style={{ fontSize: '13px' }} value="4">
                                    4 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="3">
                                    3 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="2">
                                    2 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="1">
                                    1 sao trở lên
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {/* <FilterSection
                            setRating={setRating}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            rating={rating}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        ></FilterSection> */}

                        <div className="col-lg-12 col-md-12 article">
                            <div className="shopcontainer row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading />
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {' '}
                                        {products.length !== 0 ? (
                                            products?.map((product) => (
                                                <div className="shop col-lg-3 col-md-4 col-sm-12" key={product._id}>
                                                    <div className="border-product text-center">
                                                        <Link to={`/products/${product._id}`}>
                                                            <div className="shopBack">
                                                                <img
                                                                    src={`/productImage/${product?.image[0]?.image}`}
                                                                    alt={product.name}
                                                                />
                                                            </div>
                                                        </Link>

                                                        <div className="shoptext">
                                                            <p>
                                                                <Link to={`/products/${product._id}`}>
                                                                    {product.name}
                                                                </Link>
                                                            </p>

                                                            <h3>{product?.price?.toLocaleString('de-DE')}đ</h3>
                                                            <Rating
                                                                value={product.rating}
                                                                text={`(${product.numReviews})`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="alert-warning">Không tìm thấy sản phẩm</div>
                                        )}
                                    </>
                                )}

                                {/* Pagination */}
                                <Pagination
                                    pages={pages}
                                    page={page}
                                    category={category ? category : ''}
                                    keyword={keyword ? keyword : ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
