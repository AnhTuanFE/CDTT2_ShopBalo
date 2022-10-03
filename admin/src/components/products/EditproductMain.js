import React, { useState, useEffect } from 'react';
import Toast from './../LoadingError/Toast';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, updateProduct } from './../../Redux/Actions/ProductActions';
import { PRODUCT_UPDATE_RESET } from '../../Redux/Constants/ProductConstants';
import { toast } from 'react-toastify';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { ListCategory } from '../../Redux/Actions/categoryActions';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditProductMain = (props) => {
    const { productId } = props;
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { loading, error, product } = productEdit;
    console.log(productId, 'hehehe');
    // console.log(product);
    // console.log(category);

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    useEffect(() => {
        dispatch(ListCategory());
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            toast.success('Product Updated', ToastObjects);
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(editProduct(productId));
            } else {
                setName(product.name);
                setDescription(product.description);
                setCountInStock(product.countInStock);
                setCategory(product.category);
                setImage(product.image);
                setPrice(product.price);
            }
        }
    }, [product, dispatch, productId, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (category != -1) {
            dispatch(
                updateProduct({
                    _id: productId,
                    name,
                    price,
                    category,
                    description,
                    image,
                    countInStock,
                }),
            );
        }
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'align',
        'color',
        'background',
    ];
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: '1200px' }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="content-title">Update Product</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Update now
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                                    {loadingUpdate && <Loading />}
                                    {loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <Message variant="alert-danger">{error}</Message>
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="product_title" className="form-label">
                                                    Product title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_title"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="product_price" className="form-label">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_price"
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="product_category" className="form-label">
                                                    Category
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    className="form-select"
                                                    placeholder="Category"
                                                    required
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
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
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="product_price" className="form-label">
                                                    Count In Stock
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_price"
                                                    required
                                                    value={countInStock}
                                                    onChange={(e) => setCountInStock(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Images</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={image}
                                                    required
                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Description</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={setDescription}
                                                    modules={modules}
                                                    formats={formats}
                                                ></ReactQuill>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditProductMain;
