import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSlider, deleteSlider, ListSlider } from '../../Redux/Actions/SliderAction';
import AddSlider from './AddSlider';

export default function Slidermain() {
    const sliderList = useSelector((state) => state.sliderList);
    const { slider } = sliderList;
    const sliderDelete = useSelector((state) => state.deleteSlider);
    const { error: errorDelete, success: successDelete } = sliderDelete;
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListSlider());
    }, [dispatch, successDelete]);
    const handleEditSlide = (url, id) => {
        let newSlider = window.prompt('Chỉnh sửa', `${url}`);
        if (newSlider) {
            dispatch(createSlider(newSlider, id));
        }
        console.log(newSlider);
    };
    const handleDeleteSlider = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteSlider(id));
        }
    };
    return (
        <div className="content-main">
            <div className="content-header">
                <h2 className="content-title" style={{ padding: '15px' }}>
                    Ảnh bìa
                </h2>
            </div>

            {/* <AddSlider/> */}
            <AddSlider />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Đường dẫn</th>
                        <th scope="col" className="text-end" style={{ padding: '0 20px' }}>
                            Chỉnh sửa
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slider.map((value, index) => (
                        <tr key={value._id}>
                            <td>
                                <b>Hình ảnh {index + 1}</b>
                            </td>
                            <td>{value.url}</td>
                            <td className="d-flex justify-content-end align-item-center">
                                <button
                                    onClick={() => handleEditSlide(value.url, value._id)}
                                    style={{ border: 'none', backgroundColor: '#f8f9fa' }}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button
                                    onClick={() => handleDeleteSlider(value._id)}
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
