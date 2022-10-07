import React, {Component} from "react";

import styles from './Reset.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        console.log(email);
        fetch("http://localhost:3000/api/forgotPass/forgotPassword", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(
                {
                    email
                }
            ),
        })
        .then((res)=>res.json())
        .then((data)=> {
            console.log(data, "userRegister");
            alert(data.status);
        })
    }
    render() {
        return (
            <div className={cx("container padding-bottom-3x mb-2 mt-5")}>
                <div className={cx("row justify-content-center")}>
                    <div className={cx("col-lg-8 col-md-10")}>
                        <div className={cx("forgot")}>
                            <h2>Quên mật khẩu?</h2>
                            <p>Thay đổi mật khẩu của bạn trong ba bước đơn giản !</p>
                            <ol className={cx("list-unstyled")}>
                                <li><span className={cx("text-primary text-medium")}>1. </span>Nhập địa chỉ email của bạn vào bên dưới.</li>
                                <li><span className={cx("text-primary text-medium")}>2. </span>Hệ thống của chúng tôi sẽ gửi cho bạn một liên kết tạm thời qua email</li>
                                <li><span className={cx("text-primary text-medium")}>3. </span>Mở email và sử dụng liên kết để đặt lại mật khẩu của bạn</li>
                            </ol>
                        </div>
                        <form className={cx("card mt-4")} onSubmit={this.handleSubmit}>
                            <div className={cx("card-body")}>
                                <div className={cx("form-group")}>
                                    <label for="email-for-pass">Nhập địa chỉ email của bạn</label>
                                    <input 
                                        id="email-for-pass"
                                        className="form-control" 
                                        type="email" 
                                        placeholder="YourEmail@gmail.com"
                                        onChange={(e)=>this.setState({email:e.target.value})}
                                        />

                                </div>
                            </div>
                            <div className={cx("card-footer")}>
                                <button className={cx("btn btn-success")} type="submit">Gửi</button>
                                <a href="http://localhost:3000/" className={cx("btn btn-danger")}>Trở lại trang chủ</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}