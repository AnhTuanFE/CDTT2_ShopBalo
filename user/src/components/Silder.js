import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ListSlider } from '../Redux/Actions/sliderAction';
export default function Silder() {

  const sliderList = useSelector((state) => state.sliderLoad)
  const { slider } = sliderList
  const dispatch = useDispatch()
  // const [sliderCurrent, setSliderCurrent] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    dispatch(ListSlider())
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slider?.length - 1) {
        setCurrentIndex((currentIndex) => currentIndex + 1)
      }
      else {
        setCurrentIndex(0)
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // const staticSlider = () => {
  //   return slider[currentIndex].url
  // }
  const handleIndexNext = () => {
    if (currentIndex < slider.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1)
    }

    else {
      setCurrentIndex(0)
    }
  }

  const handleIndexPre = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1)
    }

    else {
      setCurrentIndex(slider.length - 1)
    }
  }

  return (
    <div className='Announcement'>

      <div class="container ">
        <div class="row slider-row">
          <div className='slider-wrap'>
            <div className='slider'>

              <i onClick={handleIndexNext} className="slider-btn__next fal fa-angle-right"></i>
              <i onClick={handleIndexPre} className="slider-btn__pre fal fa-angle-left"></i>
              <ul class="slider-list"
              // style={{'transform':`translateX(${sliderCurrent}px)`}}
              >

                {

                  // slider.map((value, index) => (
                  //   <li className='slider-item'>
                  //     <img className='slider-img' alt={index} src={value.url} />
                  //   </li>
                  // ))

                }
                <li className='slider-item'>
                  {/* <img className='slider-item-img' src={staticSlider} /> */}
                  <img className='slider-item-img' src={slider && slider[0] != undefined ? slider[currentIndex].url : 'https://cf.shopee.vn/file/79c43b8850690947d417c61507b20486'} />
                </li>


              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
