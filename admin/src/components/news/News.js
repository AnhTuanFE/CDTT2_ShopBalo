import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ListNews, deleteNews } from '../../Redux/Actions/NewsAction';
import { NEWS_DELETE_RESET } from '../../Redux/Constants/NewsConstants';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import './style.css';
import { Link } from 'react-router-dom';
import ConfirmModal from '../Modal/ConfirmModal';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
export default function News() {
    const [checkDelete, setCheckDelete] = useState(false);
    const noHandle = () => {
        setCheckDelete(false);
    };

    const newsList = useSelector((state) => state.newsList);
    const { news } = newsList;
    const newsDelete = useSelector((state) => state.deleteNews);
    const { error: errorDelete, success: successDelete } = newsDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ListNews());
    }, []);

    useEffect(() => {
        if (successDelete) {
            toast.success('Đã xóa thành công', ToastObjects);
            dispatch({ type: NEWS_DELETE_RESET });
            dispatch(ListNews());
        }
    }, [successDelete]);

    const handleDeleteNews = (id) => {
        setCheckDelete(false);
        dispatch(deleteNews(id));
    };
    return (
        <div className="content-main" style={{ backgroundColor: '#fff' }}>
            {checkDelete && (
                <ConfirmModal
                    Title="Xóa sản phẩm"
                    Body="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                    HandleSubmit={handleDeleteNews}
                    Close="modal"
                    setFalseCancel={noHandle}
                />
            )}
            <div className="">
                <div className="content-header" style={{ marginBottom: '20px' }}>
                    <h2 className="content-title">Tin tức</h2>
                </div>
                <Toast />
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
                                                        // handleDeleteNews(newcontent._id);
                                                        setCheckDelete(true);
                                                    }}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
