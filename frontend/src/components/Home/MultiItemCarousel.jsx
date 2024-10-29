import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import { topMeel } from "./topMeel";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const MultiItemCarousel = () => {
  return (
    <div>
      <Slider {...settings}>
        {topMeel.map((item) => (
          <CarouselItem
            key={item.title}
            image={item.image}
            title={item.title}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
