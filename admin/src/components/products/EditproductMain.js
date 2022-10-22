import React, { useState, useEffect } from 'react';
import Toast from './../LoadingError/Toast';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    editProduct,
    createOptionColor,
    updateProduct,
    updateOptionProduct,
    deleteOptionProduct,
} from './../../Redux/Actions/ProductActions';
import {
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_OPTION_RESET,
    PRODUCT_OPTIONCOLOR_RESET,
    PRODUCT_DELETE_OPTION_RESET,
} from '../../Redux/Constants/ProductConstants';
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

const EditproductMain = (props) => {
    const { productId } = props;
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [optionId, setOptionId] = useState('');
    const [AddColor, setAddColor] = useState('');
    const [AddCountInStock, setAddCountInStock] = useState('');
    const [checkEdit, setCheckEdit] = useState(false);
    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { loading, error, product } = productEdit;

    const optionColor = product?.optionColor?.sort(({ color: b }, { color: a }) => (a > b ? 1 : a < b ? -1 : 0));

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const productColor = useSelector((state) => state.optionColorCreate);
    const { loading: loadingOption, error: errorOption, success: successOption } = productColor;
    const productOptionUpdate = useSelector((state) => state.productOptionUpdate);
    const { error: errorOptionUpdate, success: successOptionUpdate } = productOptionUpdate;

    const productOptionDelete = useSelector((state) => state.productOptionDelete);
    const { success: successDelete } = productOptionDelete;
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    useEffect(() => {
        if (successOptionUpdate) {
            setCheckEdit(false);
            dispatch({ type: PRODUCT_UPDATE_OPTION_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
        }
        if (successOption) {
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_OPTION_RESET });
            toast.success('Đã xóa thành công', ToastObjects);
        }
        dispatch(editProduct(productId));
    }, [successOptionUpdate, successOption, successDelete]);

    useEffect(() => {
        const options = product?.optionColor?.find((option) => option._id === optionId);
        if (options) {
            setColor(options?.color);
            setCountInStock(options?.countInStock);
        }
    }, [optionId]);

    useEffect(() => {
        dispatch(ListCategory());
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
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
                }),
            );
        }
    };
    const submitOptionHandler = (e) => {
        e.preventDefault();
        dispatch(updateOptionProduct(productId, { optionId, color, countInStock }));
    };
    const submitOptionSaveHandler = (e) => {
        e.preventDefault();
        dispatch(createOptionColor(productId, { color: AddColor, countInStock: AddCountInStock }));
        setAddColor('');
        setAddCountInStock('');
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'video'],
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
        'video',
        'align',
        'color',
        'background',
    ];
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: '1200px' }}>
                <form>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Trở về Trang sản phẩm
                        </Link>
                        <h2 className="content-title">Cập nhật sản phẩm</h2>
                        <div>
                            {/* <button type="submit" className="btn btn-primary">
                                Update now
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
                                                    className={`form-control`}
                                                    id="product_title"
                                                    //required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Giá
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Type here"
                                                    className={`form-control`}
                                                    id="product_price"
                                                    //required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_category" className="form-label">
                                                    Danh mục
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    //className="form-select"
                                                    className={`form-select`}
                                                    aria-label=".form-select-lg example"
                                                    //required
                                                    value={category}
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
                                            </div>

                                            <div className="mb-0">
                                                <label className="form-label">Ảnh</label>
                                                <input
                                                    className={`form-control `}
                                                    type="text"
                                                    placeholder="URL"
                                                    value={image}
                                                    //required

                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">Nội dung</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={setDescription}
                                                    modules={modules}
                                                    formats={formats}
                                                ></ReactQuill>
                                            </div>
                                            <div
                                                style={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}
                                            >
                                                <button
                                                    onClick={submitHandler}
                                                    className="btn btn-primary color-orange"
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </from>
                                    </div>
                                    <div
                                        className="card-body shadow-sm"
                                        style={{ marginTop: '10px', border: '1px solid #ccc' }}
                                    >
                                        <div className="row">
                                            {checkEdit && (
                                                <div className="col-md-3 col-lg-3">
                                                    {errorOptionUpdate && (
                                                        <Message variant="alert-danger">{errorOptionUpdate}</Message>
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
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={color}
                                                                onChange={(e) => setColor(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-0">
                                                            <label htmlFor="product_price" className="form-label">
                                                                Số lượng
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="Type here"
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={countInStock}
                                                                onChange={(e) => setCountInStock(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="d-grid" style={{ marginTop: '10px' }}>
                                                            <button
                                                                onClick={submitOptionHandler}
                                                                className="btn btn-primary py-2 color-orange"
                                                            >
                                                                Cập nhật
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                            <div className={checkEdit ? 'col-md-6 col-lg-6' : 'col-md-9 col-lg-9'}>
                                                <table className="table slider-data">
                                                    <thead>
                                                        <tr>
                                                            <th>Stt</th>
                                                            <th>Màu sắc</th>
                                                            <th>Số lượng</th>
                                                            <th className="text-end">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {/* Table Data */}
                                                    <tbody>
                                                        {optionColor &&
                                                            optionColor?.map((option, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{option.color}</b>
                                                                    </td>
                                                                    <td>
                                                                        <span>{option.countInStock}</span>
                                                                    </td>
                                                                    <td className="text-end">
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'right',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                className="open-option"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    setOptionId(option._id);
                                                                                    setCheckEdit(true);
                                                                                }}
                                                                            >
                                                                                <i class="icon fas fa-edit"></i>
                                                                            </button>
                                                                            <button
                                                                                className="open-option"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    if (
                                                                                        window.confirm('Are you sure??')
                                                                                    ) {
                                                                                        dispatch(
                                                                                            deleteOptionProduct(
                                                                                                productId,
                                                                                                option._id,
                                                                                            ),
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <i class="icon fas fa-trash-alt"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                <form>
                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Màu sắc
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Type here"
                                                            className={`form-control`}
                                                            id="product_price"
                                                            //required
                                                            value={AddColor}
                                                            onChange={(e) => setAddColor(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Số lượng
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Type here"
                                                            className={`form-control`}
                                                            id="product_price"
                                                            //required
                                                            value={AddCountInStock}
                                                            onChange={(e) => setAddCountInStock(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="d-grid" style={{ marginTop: '10px' }}>
                                                        <button
                                                            onClick={submitOptionSaveHandler}
                                                            className="btn btn-primary py-2 color-orange"
                                                        >
                                                            Thêm
                                                        </button>
                                                    </div>
                                                </form>
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

export default EditproductMain;
