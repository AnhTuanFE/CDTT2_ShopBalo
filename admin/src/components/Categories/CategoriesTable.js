import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCategory, ListCategory } from '../../Redux/Actions/categoryActions';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
import { CATEGORY_DELETE_RESET } from '../../Redux/Constants/CategoryConstants';

const CategoriesTable = ({ handleEditInfo, handleCurrentCategory }) => {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const dcategories = useSelector((state) => state.CategoryDelete);
    const { success } = dcategories;
    const dispatch = useDispatch();

    const notifiUpdateCategory = useSelector((state) => state.CategoryUpdate);
    const { success: updateSuccess, loading: loadingUpdate } = notifiUpdateCategory;
    const notifiDeleteCategory = useSelector((state) => state.CategoryDelete);
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = notifiDeleteCategory;

    const handleDeleteCategory = (index) => {
        if (window.confirm('Are you sure??')) {
            dispatch(DeleteCategory(categories[index]._id));
        }
    };

    const cCategory = useSelector((state) => state.CategoryAdd);
    const { success: csuccess } = cCategory;

    useEffect(() => {
        if (successDelete) {
            toast.success('Delete category success', ToastObjects);
        }
        if (errorDelete) {
            toast.error(errorDelete, ToastObjects);
        }
        dispatch({ type: CATEGORY_DELETE_RESET });
    }, [successDelete, errorDelete]);

    useEffect(() => {
        dispatch(ListCategory());
    }, [csuccess, success, updateSuccess]);
    return (
        <div className="col-md-8 col-lg-8">
            {loadingUpdate && <Loading />}
            <Toast />
            <table className="table slider-data">
                <thead>
                    <tr>
                        <th>
                            {/* <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div> */}
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                {/* Table Data */}
                <tbody>
                    {categories &&
                        categories.map((category, index) => (
                            <tr>
                                <td className=""></td>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{category.name}</b>
                                </td>
                                <td>
                                    <span>{category.description}</span>
                                </td>
                                <td className="text-end">
                                    <div className="dropdown">
                                        <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </Link>
                                        <div className="dropdown-menu">
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    handleEditInfo();
                                                    handleCurrentCategory(index);
                                                }}
                                            >
                                                Edit info
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    handleDeleteCategory(index);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesTable;
