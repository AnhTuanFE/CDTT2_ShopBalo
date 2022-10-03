import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PRODUCT_CREATE_RESET } from '../../Redux/Constants/ProductConstants';
import { createProduct } from './../../Redux/Actions/ProductActions';
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
    const [validate, setValidate] = useState({});
    const { quill, quillRef } = useQuill();
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, product } = productCreate;
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    useEffect(() => {
        if (product) {
            toast.success('Product Added', ToastObjects);
            dispatch({ type: PRODUCT_CREATE_RESET });
            setName('');
            setDescription('');
            setCategory('');
            setCountInStock(0);
            setImage('');
            setPrice(0);
        }
    }, [product, dispatch]);
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
        if (isEmpty(countInStock)) {
            msg.countInStock = 'Plesae input your countInStock';
            msg.borderRed5 = 'border-red';
        } else {
            if (countInStock < 0) {
                msg.countInStock = 'Please enter the positive value';
                msg.borderRed5 = 'border-red';
            }
        }
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
        }
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: '1200px' }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="content-title">Add product</h2>
                        <div>
                            <button type="submit" className="btn btn-primary color-orange">
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {error && <Message variant="alert-danger">{error}</Message>}
                                    {loading && <Loading />}
                                    <div className="mb-4">
                                        <label htmlFor="product_title" className="form-label">
                                            Product title
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
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Price
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

                                    <div className="mb-4">
                                        <label htmlFor="product_category" className="form-label">
                                            Category
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
                                                Please select category
                                            </option>
                                            {categories.map((cate, index) => (
                                                <option key={index} value={cate._id}>
                                                    {cate.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="product_validate">{validate.category}</p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Count In Stock
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
                                    <div className="mb-4">
                                        <label className="form-label">Images</label>
                                        <input
                                            className={`form-control ${validate.borderRed4}`}
                                            type="text"
                                            placeholder="Enter Image URL"
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
                                    <div className="mb-4">
                                        <label className="form-label">Description</label>
                                        <div
                                            onClick={() => {
                                                setValidate((values) => {
                                                    const x = { ...values };
                                                    x.borderRed6 = '';
                                                    x.description = '';
                                                    return x;
                                                });
                                            }}
                                            style={{ width: '100%', height: '300px' }}
                                        >
                                            <div ref={quillRef} />
                                        </div>
                                        <p className="product_validate">{validate.description}</p>
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
