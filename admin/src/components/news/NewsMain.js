import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListNews, deleteNews, createNews } from '../../Redux/Actions/NewsAction';
import AddNews from './AddNews';

export default function NewsMain() {
    // const newsList = useSelector((state) => state.newsList);
    // const { news } = newsList;
    // const newsDelete = useSelector((state) => state.deleteNews);
    // const { error: errorDelete, success: successDelete } = newsDelete;
    // // const [modal, setModal] = useState(false);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(ListNews());
    // }, [dispatch, successDelete]);
    // const handleEditAvatar = (value, id) => {
    //     let newsValue = window.prompt('Edit Avatar', `${value}`);
    //     if (newsValue) {
    //         dispatch(createNews(newsValue, id));
    //     }
    // };
    // const handleDeleteAvatar = (id) => {
    //     if (window.confirm('Are you sure??')) {
    //         dispatch(deleteNews(id));
    //     }
    // };
    return (
        <div className="content-main">
            {/* <div className="content-header" style={{ marginBottom: '20px' }}>
                <h2 className="content-title" style={{ padding: '15px' }}>
                    News
                </h2>
            </div> */}

            {/* <AddNews /> */}
            {/* <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        <th scope="col" className="text-end" style={{ padding: '0 20px' }}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {news?.map((value, index) => (
                        <tr key={value._id}>
                            <td>
                                <b>Avatar {index + 1}</b>
                            </td>
                            <td>{value.content}</td>
                            <td className="d-flex justify-content-end align-item-center">
                                <button
                                    onClick={() => handleEditAvatar(value.content, value._id)}
                                    style={{ border: 'none', backgroundColor: '#f8f9fa' }}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button
                                    onClick={() => handleDeleteAvatar(value._id)}
                                    className="text-success"
                                    style={{
                                        padding: '0 15px',
                                        color: 'red',
                                        border: 'none',
                                        backgroundColor: '#f8f9fa',
                                    }}
                                >
                                    <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}
