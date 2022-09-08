import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../Redux/Actions/ProductActions';

const Product = (props) => {
    const { product } = props;
    // console.log(product);
    const dispatch = useDispatch();

    const deletehandler = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            <div className="col-md-4 col-sm-4 col-lg-2-5 mb-5 fix-bottom">
                <div className="card card-product-grid">
                    <Link to={`/product/${product._id}/edit`} className="img-wrap">
                        <img src={product.image} alt="Product" />
                    </Link>
                    <div className="info-wrap">
                        <Link to={`/product/${product._id}/edit`} className="title text-truncate" style={{ color: 'black', padding: '5px 0' }}>
                            {product.name}
                        </Link>
                        <div
                            className="countInStock-price"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <div className="price mb-2">Price: ${product.price}</div>
                            <div className="stock price mb-2">Count Stock: {product.countInStock}</div>
                        </div>
                        <div className="row">
                            <Link
                                to={`/product/${product._id}/edit`}
                                className="btn btn-sm btn-outline-success col-md-6"
                                style={{ fontSize: '18px', fontWeight: '600', padding: '8px' }}
                            >
                                {/* <i className="fas fa-pen"></i> */}
                                Edit
                            </Link>
                            <Link
                                to="#"
                                onClick={() => deletehandler(product._id)}
                                className="btn btn-sm btn-outline-danger col-md-6"
                                style={{ fontSize: '18px', fontWeight: '600', padding: '8px' }}
                            >
                                {/* <i className="fas fa-trash-alt"></i> */}
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
