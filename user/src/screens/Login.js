import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import Header from './../components/Header';
import { login } from './../Redux/Actions/userActions';

const Login = ({ location, history }) => {
    // window.scrollTo(0, 0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState('');

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);
    const funtionCheck = () => {
        const msg = {};
        let re = /\S+@\S+\.\S+/;
        if (isEmpty(email)) {
            msg.email = 'Plesae input your email';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        } else {
            if (!re.test(email)) {
                msg.email = 'Incorrect Email';
                msg.borderRed1 = 'border-red';
                msg.colorRed1 = 'color-red';
            }
        }
        if (isEmpty(password)) {
            msg.password = 'Please input your password';
            msg.borderRed2 = 'border-red';
            msg.colorRed2 = 'color-red';
        } else {
            if (password.length < 6) {
                msg.password = 'Password must be at least 6 characters';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }
        setLoginCheck(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isEmptyLogin = funtionCheck();
        if (!isEmptyLogin) return;
        dispatch(login(email, password));
    };

    return (
        <>
            <Header />
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                <form className="Login col-md-6 col-lg-4 col-10" onSubmit={submitHandler}>
                    <div className="Login-from from-login">
                        <input
                            type="email"
                            //placeholder="Email"
                            className={loginCheck.borderRed1}
                            value={email}
                            onClick={() => {
                                setLoginCheck((object) => {
                                    const x = { ...object };
                                    x.borderRed1 = ' ';
                                    x.colorRed1 = ' ';
                                    x.email = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="from-login__email-pass noti-validate">{loginCheck.email}</p>
                        <p className={`from-login__email-pass-color Login-from__email ${loginCheck.colorRed1}`}>
                            Email
                        </p>
                    </div>
                    <div className="Login-from from-login">
                        <input
                            type="password"
                            //placeholder="Password"
                            className={loginCheck.borderRed2}
                            value={password}
                            onClick={() => {
                                setLoginCheck((object) => {
                                    const x = { ...object };
                                    x.borderRed2 = ' ';
                                    x.colorRed2 = ' ';
                                    x.password = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="from-login__email-pass noti-validate">{loginCheck.password}</p>
                        <p className={`from-login__email-pass-color1 Login-from__password ${loginCheck.colorRed2}`}>
                            Password
                        </p>
                    </div>
                    <button type="submit">Login</button>
                    <p>
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Create Account</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
