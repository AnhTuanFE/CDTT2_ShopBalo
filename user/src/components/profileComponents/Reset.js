import React, { Component } from 'react';

import styles from './Reset.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            defaulInput: '',
            linkEmail: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        fetch('http://localhost:3000/api/forgotPass/forgotPassword', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data, "userRegister");
                alert(data.status);
            });
            this.setState({email: ''})
            this.setState({linkEmail: true})
    }
    render() {
        return (
            <div className={cx('container padding-bottom-3x mb-2 mt-5')}>
                <div className={cx('row justify-content-center')}>
                    <div className={cx('col-lg-8 col-md-10')}>
                        <div className={cx('forgot')}>
                            <img className={cx('logoShop')} alt='hình ảnh' src="/images/logo2.png"/>
                            <h2 className={cx('headContent')}>Quên mật khẩu?</h2>
                            <p className={cx('textContent')}>Thay đổi mật khẩu của bạn trong ba bước đơn giản !</p>
                            <ol className={cx('list-unstyled')}>
                                <li>
                                    <span className={cx('text-primary text-medium')}>1. </span>Nhập địa chỉ email của
                                    bạn vào bên dưới.
                                </li>
                                <li>
                                    <span className={cx('text-primary text-medium')}>2. </span>Hệ thống của chúng tôi sẽ
                                    gửi cho bạn một liên kết tạm thời qua email
                                </li>
                                <li>
                                    <span className={cx('text-primary text-medium')}>3. </span>Mở email và sử dụng liên
                                    kết để đặt lại mật khẩu của bạn
                                </li>
                            </ol>
                        </div>
                        <form className={cx('card mt-4')}>
                            <div className={cx('card-body')}>
                                <div className={cx('form-group')}>
                                    <h2 for="email-for-pass" className={cx('labelEmail')}>Nhập địa chỉ email của bạn</h2>
                                    <input
                                        id="email-for-pass"
                                        className="form-control"
                                        type="email"
                                        placeholder="YourEmail@gmail.com"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        value={this.state.email}
                                    />
                                </div>
                            </div>
                            <div className={cx('card-footer')}>
                                <button className={cx('btn-success')} type="submit" onClick={this.handleSubmit}>
                                    Gửi
                                </button>
                                <a href="http://localhost:3000/" className={cx('btn-danger')}>
                                    Trở lại trang chủ
                                </a>
                                {
                                    this.state.linkEmail && (<a className={cx('btn-danger')} href='https://accounts.google.com/'>
                                        <i class="fa fa-chevron-circle-right" aria-hidden="true" style={
                                            {
                                                paddingRight: "20px",
                                                paddingLeft: "10px",
                                            }
                                        }></i>
                                        Đi đến email của bạn
                                        </a>)
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
