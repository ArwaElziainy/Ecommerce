import React from 'react'
import ImgSlider1 from '../../Assets/images/grocery-banner.png'
import ImgSlider2 from '../../Assets/images/grocery-banner-2.jpeg'
import ImgSlider3 from '../../Assets/images/slider-image-2.jpeg'
import ImgSlider4 from '../../Assets/images/slider-image-3.jpeg'
import ImgSlider5 from '../../Assets/images/slider-2.jpeg'
import Slider from "react-slick";


function MainSlider() {

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true
  };

  return (
    <>
      <div className="container my-5 pt-5">
        <div className="row ">
          <div className="col-md-9 p-0 mt-5">
            <Slider {...settings} >
              <img height={440} className='w-100' src={ImgSlider3} alt="" />
              <img height={440} className='w-100' src={ImgSlider4} alt="" />
              <img height={440} className='w-100' src={ImgSlider5} alt="" />

            </Slider>
          </div>
          <div className="col-md-3 p-0 mt-5">

            <img height={220} className='w-100' src={ImgSlider1} alt="" />
            <img height={220} className='w-100' src={ImgSlider2} alt="" />
          </div>
        </div>
      </div>

    </>
  )
}

export default MainSlider