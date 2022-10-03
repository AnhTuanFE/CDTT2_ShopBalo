import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createNews, ListNews } from '../../Redux/Actions/NewsAction';
import { NEWS_CREATE_RESET } from '../../Redux/Constants/NewsConstants';
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
export default function AddNews() {
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
    const newsCreate = useSelector((state) => state.newsCreate);
    const { loading, error, news } = newsCreate;
    useEffect(() => {
        if (news) {
            toast.success('News add success', ToastObjects);
            dispatch({ type: NEWS_CREATE_RESET });
            setNameUser('');
            setTitle('');
            setImage('');
            setContent('');
        }
    }, [dispatch, news]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createNews({ nameUser, title, image, content }));
    };

    return (
        <div className="content-main" style={{ backgroundColor: '#fff' }}>
            <Toast />
            <form onSubmit={submitHandler} class="needs-validation" novalidate>
                <div className="content-header" style={{ marginBottom: '20px' }}>
                    <h2 className="content-title">News</h2>
                    <button type="submit" className="btn btn-primary color-orange">
                        AddNews
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
