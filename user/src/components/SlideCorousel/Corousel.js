import React from 'react';
import Slider from 'react-slick';
import Rating from '../homeComponents/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '../../Redux/Actions/ProductActions';
import { useEffect, useState } from 'react';

export default function Corousel() {
    const allProduct = useSelector((state) => state.productAll);
    const { products, loading } = allProduct;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                },
            },
        ],
    };
    return (
        <div className="container corousel-container">
            <h2 className="section-title">
                <b></b>
                <span className="section-title-main">Sản Phẩm Mới Nhất</span>
                <b></b>
            </h2>
            <div className="corousel">
                <Slider {...settings}>
                    {products?.map((product, index) => {
                        return (
                            <div key={index} className="corousel-div" style={{ maxHeight: '300px' }}>
                                <Link to={`/products/${product._id}`} className="corousel-link">
                                    <img
                                        src={`/productImage/${product?.image[0]?.image}`}
                                        className="corousel-img"
                                        alt=""
                                    ></img>
                                    <p className="corousel-noti">{product.name}</p>
                                    <p className="corousel-price">{product?.price?.toLocaleString('de-DE')}đ</p>
                                    <div className="corousel-rating">
                                        <Rating value={product.rating} text={`(${product.numReviews})`} />
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
