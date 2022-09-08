import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function CategorySection() {
    const handlerApply = (e) => {
        e.preventDefault();
    };
    return (
        <div className="section-div col-lg-2 col-md-3">
            <div className="Category-section">
                <div className="section-flex">
                    <i class="fas fa-align-left"></i>
                    <h2 className="Category-section__h2">Category</h2>
                </div>
                <ul className="Category-section__list">
                    <li className="Category-section__li">
                        <Link to={'#'}>Dress</Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>Shirt Men</Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>Shirt Woman</Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>Prant</Link>
                    </li>
                </ul>
            </div>
            <div className="Category-search">
                <div className="section-flex">
                    <i class="fas fa-filter "></i>
                    <h2 className="Category-section__h2 Category-search__h2">Filter</h2>
                </div>
                <form className="distance-price" onClick={handlerApply}>
                    <p className="distance-price__p">Khoảng Giá</p>
                    <div className="distance-price__flex" style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="text" placeholder="₫ Từ"></input>
                        <label>-</label>
                        <input type="text" placeholder="₫ Đến"></input>
                    </div>
                    <button className="distance-price__submit">APPLY</button>
                </form>
                {/* <form className="assess-star">
                    <p className="distance-price__p">Assess</p>
                    <div className="assess-star__div">
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" className="star-none" id="starFive"></input>
                            <label for="starFive">
                                <Rating value="5"></Rating>
                            </label>
                        </div>
                        <Rating value="4" text="Upwards"></Rating>
                        <Rating value="3" text="Upwards"></Rating>
                        <Rating value="2" text="Upwards"></Rating>
                        <Rating value="1" text="Upwards"></Rating>
                    </div>
                </form> */}
                {/* <form className="Category-search__form">
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-1" type="checkbox"></input>
                        <label for="checkbox-1" className="Category-section__li Category-search__form-lable">
                            Dress
                        </label>
                    </div>
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-2" type="checkbox"></input>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">
                            Dress
                        </label>
                    </div>
                </form> */}
            </div>
        </div>
    );
}
