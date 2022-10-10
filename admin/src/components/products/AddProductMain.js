import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PRODUCT_CREATE_RESET, PRODUCT_OPTIONCOLOR_RESET } from '../../Redux/Constants/ProductConstants';
import { createProduct, createOptionColor, editProduct } from '../../Redux/Actions/ProductActions';
import Toast from '../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import isEmpty from 'validator/lib/isEmpty';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const AddProductMain = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [productId, setProducId] = useState('');
    const [validate, setValidate] = useState({});
    const { quill, quillRef } = useQuill();
    const [disabledOptionColor, setDisabledOptionColor] = useState(false);
    const [disabledProduct, setDisabledProduct] = useState(true);
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, product } = productCreate;
    const productColor = useSelector((state) => state.optionColorCreate);
    const { loading: loadingOption, error: errorOption, success: successOption } = productColor;
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    const productEdit = useSelector((state) => state.productEdit);
    const { product: productOption } = productEdit;

    useEffect(() => {
        if (product) {
            toast.success('Thêm sản phẩm thành công', ToastObjects);
            dispatch({ type: PRODUCT_CREATE_RESET });
            setProducId(product._id);
        }
    }, [product, dispatch]);

    useEffect(() => {
        if (successOption) {
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            setColor('');
            setCountInStock(1);
        }
    }, [successOption, dispatch]);

    useEffect(() => {
        dispatch(editProduct(productId));
    }, [productId, successOption]);

    useEffect(() => {
        dispatch(ListCategory());
    }, []);
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescription(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);
    const isEmptyCheckEdit = () => {
        const msg = {};
        if (isEmpty(category)) {
            msg.category = 'Plesae input your category';
            msg.borderRed1 = 'border-red';
        }
        if (isEmpty(name)) {
            msg.name = 'Please input your name';
            msg.borderRed2 = 'border-red';
        }
        if (isEmpty(price)) {
            msg.price = 'Plesae input your price';
            msg.borderRed3 = 'border-red';
        } else {
            if (price < 0) {
                msg.price = 'Please enter the positive value';
                msg.borderRed3 = 'border-red';
            }
        }
        if (isEmpty(image)) {
            msg.image = 'Please input your image';
            msg.borderRed4 = 'border-red';
        }
        // if (isEmpty(countInStock)) {
        //     msg.countInStock = 'Plesae input your countInStock';
        //     msg.borderRed5 = 'border-red';
        // } else {
        //     if (countInStock < 0) {
        //         msg.countInStock = 'Please enter the positive value';
        //         msg.borderRed5 = 'border-red';
        //     }
        // }
        if (isEmpty(description)) {
            msg.description = 'Please input your description';
            msg.borderRed6 = 'border-red';
        }
        setValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isEmptyValidate = isEmptyCheckEdit();
        if (!isEmptyValidate) return;
        // console.log(category);
        if (category != -1) {
            dispatch(createProduct(name, price, description, category, image, countInStock));
            setDisabledProduct(false);
            setDisabledOptionColor(true);
        }
    };
    const submitOptionHandler = (e) => {
        e.preventDefault();
        // const isEmptyValidate = isEmptyCheckEdit();
        // if (!isEmptyValidate) return;
        dispatch(createOptionColor(productId, { color, countInStock }));
    };
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: '1200px' }}>
                <form>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Trở về products
                        </Link>
                        <h2 className="content-title">Add product</h2>
                        <div>
                            {/* <button type="submit" className="btn btn-primary color-orange">
                                Add Product
                            </button> */}
                        </div>
                    </div>

                    <div className="row mb-0">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-0">
                                <div className="card-body shadow-sm">
                                    <div className="card-body shadow-sm" style={{ border: '1px solid #ccc' }}>
                                        {error && <Message variant="alert-danger">{error}</Message>}
                                        {loading && <Loading />}
                                        <from>
                                            <div className="mb-0">
                                                <label htmlFor="product_title" className="form-label">
                                                    Tên sản phẩm
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className={`form-control ${validate.borderRed2}`}
                                                    id="product_title"
                                                    //required
                                                    value={name}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed2 = '';
                                                            x.name = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.name}</p>
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Giá
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Type here"
                                                    className={`form-control ${validate.borderRed3}`}
                                                    id="product_price"
                                                    //required
                                                    value={price}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed3 = '';
                                                            x.price = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.price}</p>
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_category" className="form-label">
                                                    Danh mục
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    //className="form-select"
                                                    className={`form-select ${validate.borderRed1}`}
                                                    aria-label=".form-select-lg example"
                                                    //required
                                                    value={category}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed1 = '';
                                                            x.category = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    title="Please select category"
                                                    placeholder="Please select category"
                                                >
                                                    <option value={-1} selected>
                                                        Chọn
                                                    </option>
                                                    {categories.map((cate, index) => (
                                                        <option key={index} value={cate._id}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <p className="product_validate">{validate.category}</p>
                                            </div>

                                            <div className="mb-0">
                                                <label className="form-label">Ảnh</label>
                                                <input
                                                    className={`form-control ${validate.borderRed4}`}
                                                    type="text"
                                                    placeholder="URL"
                                                    value={image}
                                                    //required
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed4 = '';
                                                            x.image = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.image}</p>
                                                {/* <input className="form-control mt-3" type="file" /> */}
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">Nội dung</label>
                                                <div
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed6 = '';
                                                            x.description = '';
                                                            return x;
                                                        });
                                                    }}
                                                    style={{ width: '100%' }}
                                                >
                                                    <div ref={quillRef} />
                                                </div>
                                                <p className="product_validate">{validate.description}</p>
                                            </div>
                                            <div
                                                style={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}
                                            >
                                                {disabledProduct && (
                                                    <button
                                                        className="btn btn-primary color-orange"
                                                        onClick={submitHandler}
                                                    >
                                                        Lưu
                                                    </button>
                                                )}
                                            </div>
                                        </from>
                                    </div>
                                    <div
                                        className="card-body shadow-sm"
                                        style={{ marginTop: '10px', border: '1px solid #ccc' }}
                                    >
                                        <div className="row">
                                            <div className="col-md-4 col-lg-4">
                                                {errorOption && (
                                                    <Message variant="alert-danger">
                                                        Màu bị trùng hoặc số lượng chưa đúng vui lòng nhập lại
                                                    </Message>
                                                )}
                                                {/* {loadingOption && <Loading />} */}
                                                <form>
                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Màu sắc
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Type here"
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={color}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setColor(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Số lượng
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Type here"
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={countInStock}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setCountInStock(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="d-grid" style={{ marginTop: '10px' }}>
                                                        {disabledOptionColor && (
                                                            <button
                                                                onClick={submitOptionHandler}
                                                                className="btn btn-primary py-2 color-orange"
                                                            >
                                                                Lưu
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-8 col-lg-8">
                                                <table className="table slider-data">
                                                    <thead>
                                                        <tr>
                                                            <th>Stt</th>
                                                            <th>Màu sắc</th>
                                                            <th>Số lượng</th>
                                                        </tr>
                                                    </thead>
                                                    {/* Table Data */}
                                                    <tbody>
                                                        {productOption?.optionColor &&
                                                            productOption?.optionColor?.map((option, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{option.color}</b>
                                                                    </td>
                                                                    <td>
                                                                        <span>{option.countInStock}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProductMain;
