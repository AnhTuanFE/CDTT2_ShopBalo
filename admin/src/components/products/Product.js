import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../Redux/Actions/ProductActions';
import ConfirmModal from '../Modal/ConfirmModal';

const Product = (props) => {
    const { product, index } = props;
    const dispatch = useDispatch();
    const [checkDelete, setCheckDelete] = useState(false);

    const noHandle = () => {
        setCheckDelete(false);
    };
    const deletehandler = (id) => {
        setCheckDelete(false);
        dispatch(deleteProduct(id));
    };

    return (
        <>
            {checkDelete && (
                <ConfirmModal
                    Title="Xóa sản phẩm"
                    Body="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                    HandleSubmit={deletehandler}
                    Close="modal"
                    setFalseCancel={noHandle}
                />
            )}
            {product && (
                <tr>
                    <td style={{ width: '10%' }}>{index + 1}</td>
                    <td style={{ width: '20%' }}>
                        <img
                            src={`/productImage/${product?.image[0]?.image}`}
                            alt="Product"
                            style={{ height: '40px', width: '40px' }}
                        />
                    </td>
                    <td style={{ width: '40%' }}>
                        <span> {product.name}</span>
                    </td>
                    <td style={{ width: '20%' }}>
                        <span> {product?.price?.toLocaleString('de-DE')}đ</span>
                    </td>
                    {/* <td>
                        <span> {product.countInStock}</span>
                    </td> */}
                    <td className="text-end" style={{ width: '10%' }}>
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
                                        // deletehandler(product._id);
                                        setCheckDelete(true);
                                    }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default Product;
