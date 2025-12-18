import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GenericCarousel = ({ items, renderItem, settings = {} }) => {
  const defaultSettings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 20000, 
    cssEase: "linear",
    arrows: false,
    swipe: false,
    pauseOnHover: true,
    draggable: false,
    centerPadding: "24px",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
    ...settings,
  };

  return (
    <div style={{ padding: "0 128px" }}> 
      <Slider {...defaultSettings}>
        {items.map((item, index) => (
          <div key={index} style={{ padding: "0 12px" }}> 
            <div style={{ transform: "scale(0.95)" }}>
              {renderItem(item)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GenericCarousel;
