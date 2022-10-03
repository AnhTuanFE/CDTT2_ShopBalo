import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editNews, updateNews } from '../../Redux/Actions/NewsAction';
import { NEWS_UPDATE_RESET } from '../../Redux/Constants/NewsConstants';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import isEmpty from 'validator/lib/isEmpty';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
export default function EditNews(props) {
    const { idNews } = props;
    const dispatch = useDispatch();
    const [nameUser, setNameUser] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

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
    const getEditNews = useSelector((state) => state.getEditNews);
    const { news } = getEditNews;
    const newsUpdate = useSelector((state) => state.newsUpdate);
    const { loading, error, valueUpdateNews } = newsUpdate;
    useEffect(() => {
        dispatch(editNews(idNews));
    }, [idNews]);
    useEffect(() => {
        setNameUser(news?.nameUser);
        setTitle(news?.title);
        setImage(news?.image);
        setContent(news?.content);
    }, [news]);
    useEffect(() => {
        if (valueUpdateNews) {
            toast.success('News update success', ToastObjects);
            dispatch({ type: NEWS_UPDATE_RESET });
        }
    }, [dispatch, valueUpdateNews]);

    const submitHandlerUpload = (e) => {
        e.preventDefault();
        dispatch(updateNews(idNews, { nameUser, title, image, content }));
    };
    return (
        <div className="content-main" style={{ backgroundColor: '#fff' }}>
            <Toast />
            <form onSubmit={submitHandlerUpload} class="needs-validation" novalidate>
                <div className="content-header" style={{ marginBottom: '20px' }}>
                    <h2 className="content-title">Update News</h2>
                    <button type="submit" className="btn btn-primary color-orange">
                        Update News
                    </button>
                </div>
                {error && (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {loading && <Loading />}
                <div class="form-group">
                    <label for="validationCustom01">Người đăng bài</label>
                    <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        placeholder="Người đăng bài"
                        value={nameUser}
                        onChange={(e) => {
                            setNameUser(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="validationCustom02">Tên tiêu đề</label>
                    <input
                        type="text"
                        class="form-control"
                        id="validationCustom02"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="validationCustom03">Ảnh tiêu đề</label>
                    <input
                        type="text"
                        class="form-control"
                        id="validationCustom03"
                        placeholder="Ảnh"
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="validationCustom04" style={{ marginBottom: '10px' }}>
                        Nội dung
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    ></ReactQuill>
                </div>
            </form>
        </div>
    );
}
