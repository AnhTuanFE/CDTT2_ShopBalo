import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '../Redux/Actions/sliderAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Sliders() {
    const sliderList = useSelector((state) => state.sliderLoad);
    const { slider } = sliderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListSlider());
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        cssEase: 'linear',
    };
    return (
        <div className="Announcement Announcement-slider">
            <div class="container container-slider">
                <div class="row slider-row">
                    <Slider {...settings}>
                        {slider?.map((value, index) => {
                            return (
                                <div key={index} className="slider-div__image">
                                    <img className="slider-image" src={value.url} alt="Slider"></img>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
