import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
  "https://i.pinimg.com/736x/9b/5b/a3/9b5ba3e026d447c24f1a7bf47616024e.jpg",
  "https://i.pinimg.com/736x/01/34/b0/0134b0fe5ab4c9484d7aa3ae565177f0.jpg",
  "https://i.pinimg.com/736x/95/fa/d8/95fad867faa47695ab5de245da7b26f2.jpg",
  "https://i.pinimg.com/736x/51/92/a8/5192a8d657b6562b0530b983a8352d1a.jpg",
  "https://i.pinimg.com/736x/e3/93/28/e3932816109b6af5b32efd7f231623b3.jpg",
  "https://i.pinimg.com/736x/1e/25/f5/1e25f5cbfb93f177e175a72720ac56e1.jpg",
];

const ImageSlider = () => {
  return (
    <div className="w-full px-4 py-12 mx-auto mb-20 max-w-7xl">
      <Swiper
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1, //  Show only 1 image on mobile
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay]}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[22rem] object-cover rounded-xl shadow-md sm:w-[22rem]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
