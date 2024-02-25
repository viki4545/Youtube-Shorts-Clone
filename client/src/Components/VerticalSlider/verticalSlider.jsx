import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";
import "./verticalSlider.css";

SwiperCore.use([Navigation, Pagination]);

const VerticalSlider = ({ videos }) => {
  const swiperOptions = {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {videos.map((video, index) => (
          <div key={index} className="swiper-slide">
            {/* Render your video component here, e.g., <VideoPlayer video={video} /> */}
          </div>
        ))}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default VerticalSlider;
