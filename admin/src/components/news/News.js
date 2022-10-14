import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createNews, ListNews, deleteNews } from '../../Redux/Actions/NewsAction';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import './style.css';
import { Link } from 'react-router-dom';

export default function News() {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };
    const newsList = useSelector((state) => state.newsList);
    const { news } = newsList;
    const newsDelete = useSelector((state) => state.deleteNews);
    const { error: errorDelete, success: successDelete } = newsDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListNews());
    }, [dispatch, successDelete]);
    // const handleEditNews = (id) => {
    //     if (id) {
    //         dispatch(createNews(id));
    //     }
    // };
    const handleDeleteNews = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteNews(id));
        }
    };
    return (
        <div className="content-main" style={{ backgroundColor: '#fff' }}>
            <div className="">
                <div className="content-header" style={{ marginBottom: '20px' }}>
                    <h2 className="content-title">Tin tức</h2>
                </div>
                {/* {loadingUpdate && <Loading />} */}
                {/* <Toast /> */}
                <table className="table slider-data">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Người đăng bài</th>
                            <th>Tiêu đề</th>
                            <th className="text-end">Chỉnh sửa</th>
                        </tr>
                    </thead>
                    {/* Table Data */}
                    <tbody>
                        {news &&
                            news.map((newcontent, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <b>{newcontent.nameUser}</b>
                                    </td>
                                    <td>
                                        <span>{newcontent.title}</span>
                                    </td>
                                    <td className="text-end">
                                        <div className="dropdown">
                                            <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </Link>
                                            <div className="dropdown-menu">
                                                <Link to={`/editnews/${newcontent._id}/edit`} className="dropdown-item">
                                                    Sửa
                                                </Link>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        handleDeleteNews(newcontent._id);
                                                    }}
                                                >
                                                    Xóa
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
        </div>
    );
}
