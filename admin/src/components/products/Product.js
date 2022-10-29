import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../Redux/Actions/ProductActions';

const Product = (props) => {
    const { product, index } = props;
    // console.log(product);
    const dispatch = useDispatch();

    const deletehandler = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            {product && (
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <img
                            src={`/productImage/${product?.image[0]?.image}`}
                            alt="Product"
                            style={{ height: '40px', width: '40px' }}
                        />
                    </td>
                    <td>
                        <span> {product.name}</span>
                    </td>
                    <td>
                        <span> {product?.price?.toLocaleString('de-DE')}đ</span>
                    </td>
                    <td>
                        <span> {product.countInStock}</span>
                    </td>
                    <td className="text-end">
                        <div className="dropdown">
                            <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                                <i className="fas fa-ellipsis-h"></i>
                            </Link>
                            <div className="dropdown-menu">
                                <Link to={`/product/${product._id}/edit`} className="dropdown-item">
                                    Sửa
                                </Link>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        deletehandler(product._id);
                                    }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </td>
                    <td></td>
                </tr>
            )}
        </>
    );
};

export default Product;
