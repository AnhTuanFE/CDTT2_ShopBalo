import React from "react";
import Slider from "react-slick";
import Rating from "../homeComponents/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAllOrder } from "../../Redux/Actions/OrderActions";
import { useEffect, useState } from "react";

export default function CorouselOder() {
  const orderAllList = useSelector((state) => state.listAllOrder);
  const { products, loading } = orderAllList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAllOrder());
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
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
    <div className="container corousel-container">
      <h2>Best seller</h2>
      <div></div>
      <div className="corousel">
        <Slider {...settings}>
          {products &&
            products?.map((product, index) => {
              return (
                <div key={index} className="corousel-div">
                  <Link
                    to={`/products/${product._id}`}
                    className="corousel-link"
                  >
                    <img src={product.image} className="corousel-img"></img>
                    <p className="corousel-noti">{product.name}</p>
                    <div className="corousel-rating">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <p className="corousel-price">${product.price}</p>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}
