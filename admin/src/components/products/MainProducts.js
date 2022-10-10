import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import Pagination from '../Home/pagination';

const MainProducts = (props) => {
    const { category, keyword, pageNumber } = props;
    const dispatch = useDispatch();
    let history = useHistory();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = productDelete;
    //category
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const [kewywordSearch, setKewywordSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        if (kewywordSearch !== undefined) {
            if (kewywordSearch.trim() && kewywordSearch) {
                history.push(`/products/search/${kewywordSearch}`);
            } else {
                history.push(`/products`);
            }
        }
    };
    const handleCategory = (e) => {
        e.preventDefault();
        if (e.target.value !== undefined) {
            if (e.target.value.trim() && e.target.value) {
                history.push(`/products/category/${e.target.value}`);
            } else {
                history.push(`/products`);
            }
        }
    };
    useEffect(() => {
        dispatch(listProducts(category, keyword, pageNumber));
        dispatch(ListCategory());
    }, [dispatch, successDelete, category, keyword, pageNumber]);

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Products</h2>
                <div>
                    <Link to="/addproduct" className="btn btn-primary color-orange">
                        Tạo mới
                    </Link>
                </div>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto ">
                            <form onSubmit={(e) => handleSearch(e)}>
                                <div className="input-group" style={{ alignItems: 'center' }}>
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="form-control p-2"
                                        onChange={(e) => {
                                            setKewywordSearch(e.target.value);
                                        }}
                                    />
                                    <button className="btn btn-light bg" type="submit" style={{ height: '42px' }}>
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => {
                                    handleCategory(e);
                                }}
                            >
                                <option value={''}>All category</option>
                                {categories.map((category) => (
                                    <option value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row">
                            {/* Products */}
                            <div className="col-md-12 col-sm-12 col-lg-12">
                                <table className="table slider-data">
                                    <thead>
                                        <tr>
                                            <th>Stt</th>
                                            <th>Sản phẩm</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <Product product={product} key={product._id} index={index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <Pagination
                        pages={pages}
                        page={page}
                        category={category ? category : ''}
                        keyword={keyword ? keyword : ''}
                    ></Pagination>
                </div>
            </div>
        </section>
    );
};

export default MainProducts;
