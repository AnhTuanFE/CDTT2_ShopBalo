import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../LoadingError/Toast';
import { addCategory } from '../../Redux/Actions/categoryActions';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';
import { CATEGORY_ADD_RESET } from '../../Redux/Constants/CategoryConstants';
import isEmpty from 'validator/lib/isEmpty';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const CreateCategory = () => {
    const [name, setName] = useState('');
    // const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [validate, setValidate] = useState({});
    const dispatch = useDispatch();

    const cCategory = useSelector((state) => state.CategoryAdd);
    const { loading, error, success } = cCategory;

    useEffect(() => {
        if (success) {
            toast.success('Category Added', ToastObjects);
        }
        if (error) {
            toast.error(error, ToastObjects);
        }
        dispatch({ type: CATEGORY_ADD_RESET });
    }, [success, error]);

    const isEmptyCheckEdit = () => {
        const msg = {};
        if (isEmpty(name)) {
            msg.name = 'Plesae input your name';
            msg.borderRed1 = 'border-red';
        }
        // if (isEmpty(image)) {
        //     msg.image = 'Please input your image';
        //     msg.borderRed2 = 'border-red';
        // }
        if (isEmpty(description)) {
            msg.description = 'Plesae input your description';
            msg.borderRed3 = 'border-red';
        }
        setValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const handleCreateCategory = (e) => {
        e.preventDefault();
        const isEmptyValidate = isEmptyCheckEdit();
        if (!isEmptyValidate) return;
        dispatch(addCategory(name, description));
        setName('');
        // setImage('');
        setDescription('');
    };
    return (
        <>
            <Toast />
            <div className="col-md-4 col-lg-4">
                <form>
                    {loading && <Loading />}
                    <div className="mb-4">
                        <label htmlFor="product_name" className="form-label">
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Type here"
                            className={`form-control py-3 ${validate.borderRed1}`}
                            id="product_name"
                            value={name}
                            onClick={() => {
                                setValidate((values) => {
                                    const x = { ...values };
                                    x.borderRed1 = '';
                                    x.name = '';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p className="product_validate">{validate.name}</p>
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="product_name" className="form-label">
                            Image
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Type here"
                            className={`form-control py-3 ${validate.borderRed2}`}
                            id="product_name"
                            value={image}
                            onClick={() => {
                                setValidate((values) => {
                                    const x = { ...values };
                                    x.borderRed2 = '';
                                    x.image = '';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setImage(e.target.value);
                            }}
                        />
                        <p className="product_validate">{validate.image}</p>
                    </div> */}
                    {/* <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div> */}
                    {/* <form method="POST" action="api/upload-profile-pic" enctype="multipart/form-data">
          <div>
            <label>Select your profile picture:</label>
            <input type="file" name="profile_pic" />
          </div>
          <div>
            <input type="submit" name="btn_upload_profile_pic" value="Upload" />
          </div>
        </form> */}
                    <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                            required
                            placeholder="Type here"
                            className={`form-control ${validate.borderRed3}`}
                            rows="4"
                            value={description}
                            onClick={() => {
                                setValidate((values) => {
                                    const x = { ...values };
                                    x.borderRed3 = '';
                                    x.description = '';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>
                        <p className="product_validate">{validate.description}</p>
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary py-3 color-orange" onClick={handleCreateCategory}>
                            Create category
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateCategory;
