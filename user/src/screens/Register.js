import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import { register } from '../Redux/Actions/userActions';
import Header from './../components/Header';

const Register = ({ location, history }) => {
    window.scrollTo(0, 0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cfpassword, setCfPassword] = useState('');

    const [checkValidate, setCheckValidate] = useState({}); // tao một usestate mới để check from
    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    //xủ lí logic check from
    const validateAll = () => {
        const msg = {};
        let re = /\S+@\S+\.\S+/;
        if (isEmpty(name)) {
            msg.name = 'Please input your name';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        }

        if (isEmpty(email)) {
            msg.email = 'Plesae input your email';
            msg.borderRed2 = 'border-red';
            msg.colorRed2 = 'color-red';
        } else {
            if (!re.test(email)) {
                msg.email = 'Incorrect Email';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }

        if (isEmpty(phone)) {
            msg.phone = 'Plesae input your phone';
            msg.borderRed3 = 'border-red';
            msg.colorRed3 = 'color-red';
        } else {
            if (isNaN(phone)) {
                msg.phone = 'Incorrect phone number';
                msg.borderRed3 = 'border-red';
                msg.colorRed3 = 'color-red';
            }
        }
        if (isEmpty(password)) {
            msg.password = 'Please input your password';
            msg.borderRed4 = 'border-red';
            msg.colorRed4 = 'color-red';
        } else {
            if (password.length < 6) {
                msg.password = 'Password must be at least 6 characters';
                msg.borderRed4 = 'border-red';
                msg.colorRed4 = 'color-red';
            }
        }

        if (isEmpty(cfpassword)) {
            msg.cfpassword = 'Please input your cfpassword';
            msg.borderRed5 = 'border-red';
            msg.colorRed5 = 'color-red';
        } else {
            if (cfpassword.length < 6) {
                msg.cfpassword = 'CfPassword must be at least 6 characters';
                msg.borderRed5 = 'border-red';
                msg.colorRed5 = 'color-red';
            } else {
                if (cfpassword !== password) {
                    msg.cfpassword = 'The password entered is incorrect';
                    msg.borderRed5 = 'border-red';
                    msg.colorRed5 = 'color-red';
                }
            }
        }
        setCheckValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    // console.log(checkValidate);

    const submitHandler = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        dispatch(register(name, email, phone, password));
    };

    return (
        <>
            <Header />
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}

                <form className="Login col-md-6 col-lg-4 col-10" onSubmit={submitHandler}>
                    <div className="Login-from">
                        <input
                            type="text"
                            className={checkValidate.borderRed1}
                            //placeholder="Username"
                            value={name}
                            onClick={() => {
                                setCheckValidate((object) => {
                                    const x = { ...object };
                                    x.borderRed1 = ' ';
                                    x.colorRed1 = ' ';
                                    x.name = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{checkValidate.name}</p>
                        <p className={`Login-from__name ${checkValidate.colorRed1}`}>Username</p>
                    </div>

                    <div className="Login-from">
                        <input
                            type="email"
                            //placeholder="Email"
                            className={checkValidate.borderRed2}
                            value={email}
                            onClick={() => {
                                setCheckValidate((object) => {
                                    const x = { ...object };
                                    x.borderRed2 = ' ';
                                    x.colorRed2 = ' ';
                                    x.email = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{checkValidate.email}</p>
                        <p className={`Login-from__email ${checkValidate.colorRed2}`}>Email</p>
                    </div>

                    <div className="Login-from">
                        <input
                            type="text"
                            className={checkValidate.borderRed3}
                            //placeholder="Phone"
                            value={phone}
                            onClick={() => {
                                setCheckValidate((object) => {
                                    const x = { ...object };
                                    x.borderRed3 = ' ';
                                    x.colorRed3 = ' ';
                                    x.phone = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{checkValidate.phone}</p>
                        <p className={`Login-from__phone ${checkValidate.colorRed3}`}>Phone</p>
                    </div>

                    <div className="Login-from">
                        <input
                            type="password"
                            className={checkValidate.borderRed4}
                            //placeholder="Password"
                            value={password}
                            onClick={() => {
                                setCheckValidate((object) => {
                                    const x = { ...object };
                                    x.borderRed4 = ' ';
                                    x.colorRed4 = ' ';
                                    x.password = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{checkValidate.password}</p>
                        <p className={`Login-from__password ${checkValidate.colorRed4}`}>Password</p>
                    </div>

                    <div className="Login-from">
                        <input
                            type="password"
                            className={checkValidate.borderRed5}
                            //placeholder="Cfpassword"
                            value={cfpassword}
                            onClick={() => {
                                setCheckValidate((object) => {
                                    const x = { ...object };
                                    x.borderRed5 = ' ';
                                    x.colorRed5 = ' ';
                                    x.cfpassword = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => {
                                setCfPassword(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{checkValidate.cfpassword}</p>
                        <p className={`Login-from__cfpassword ${checkValidate.colorRed5}`}>Cfpassword</p>
                    </div>

                    <button type="submit">Register</button>
                    <p>
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            I Have Account <strong>Login</strong>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;
