import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListNews } from '../../Redux/Actions/newsAction';
import { useEffect, useState } from 'react';
import './style.css';

export default function NewsMain() {
    const listAllNews = useSelector((state) => state.listNews);
    const { products, news } = listAllNews;
    console.log(listAllNews, 'hehehe');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListNews());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        <div className="container corousel-container corousel-oder">
            <h2 className="section-title">
                <b></b>
                <span className="section-title-main">Tin Tức & Sự Kiện</span>
                <b></b>
            </h2>
            <div></div>
            <div className="corousel news">
                <Slider {...settings}>
                    {news &&
                        news?.map((newValue, index) => {
                            return (
                                <div key={index} className="corousel-div m-2 mx-2">
                                    <Link to={`/news/${newValue._id}`} className="corousel-link">
                                        <img src={newValue.image} className="corousel-img"></img>
                                        <p className="corousel-noti news-title">{newValue.title}</p>{' '}
                                        <div
                                            className="corousel-noti news-content"
                                            dangerouslySetInnerHTML={{ __html: newValue.content }}
                                        ></div>
                                    </Link>
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}
