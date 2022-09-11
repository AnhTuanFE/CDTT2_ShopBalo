import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListAvatar, deleteAvatar, createAvatar } from '../../Redux/Actions/AvatarAction';
import AddAvatar from './AddAvatar';

export default function AvatarMain() {
    const avatarList = useSelector((state) => state.avatarList);
    const { avatar } = avatarList;
    const avatarDelete = useSelector((state) => state.deleteAvatar);
    const { error: errorDelete, success: successDelete } = avatarDelete;
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListAvatar());
    }, [dispatch, successDelete]);
    const handleEditAvatar = (url, id) => {
        let newAvatar = window.prompt('Edit Avatar', `${url}`);
        if (newAvatar) {
            dispatch(createAvatar(newAvatar, id));
        }
        console.log(newAvatar);
    };
    const handleDeleteAvatar = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteAvatar(id));
        }
    };
    return (
        <div className="content-main">
            <div className="content-header">
                <h2 className="content-title" style={{ padding: '15px' }}>
                    Avatar
                </h2>
            </div>

            {/* <AddSlider/> */}
            <AddAvatar />
            <table className="table">
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
                    {avatar?.map((value, index) => (
                        <tr key={value._id}>
                            <td>
                                <b>Avatar {index + 1}</b>
                            </td>
                            <td>{value.url}</td>
                            <td className="d-flex justify-content-end align-item-center">
                                <button
                                    onClick={() => handleEditAvatar(value.url, value._id)}
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
            </table>
        </div>
    );
}
