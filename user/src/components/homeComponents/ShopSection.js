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
    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts));
    }, [dispatch, category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts]);

    return (
        <>
            <div className="container">
                <div className="section">
                    <div
                        style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px', marginRight: '20px' }}
                    >
                        <div className="">
                            <select
                                className="form-select"
                                value={sortProducts}
                                onChange={(e) => {
                                    setSortProducts(e.target.value);
                                }}
                            >
                                <option value="1">Newest</option>
                                {/* <option value="2">Most prominent</option> */}
                                <option value="3">Prices gradually increase</option>
                                <option value="4">Price descending</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <FilterSection
                            setRating={setRating}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            rating={rating}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        ></FilterSection>

                        <div className="col-lg-10 col-md-9 article">
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
                                                <div className="shop col-lg-3 col-md-6 col-sm-12" key={product._id}>
                                                    <div className="border-product">
                                                        <Link to={`/products/${product._id}`}>
                                                            <div className="shopBack">
                                                                <img src={product.image} alt={product.name} />
                                                            </div>
                                                        </Link>

                                                        <div className="shoptext">
                                                            <p>
                                                                <Link to={`/products/${product._id}`}>
                                                                    {product.name}
                                                                </Link>
                                                            </p>

                                                            <Rating
                                                                value={product.rating}
                                                                text={`${product.numReviews} reviews`}
                                                            />
                                                            <h3>${product.price}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="alert-warning">Not found product</div>
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
