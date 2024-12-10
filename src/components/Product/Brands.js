"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const OurBrandsCarousel = () => {
  const brands = [
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-2.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-4.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-6.png",
    },
    {
      images:
        "https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-7.png",
    },
  ];

  return (
    <div className="py-10">
      <div className="mb-14">
        <h2 className="text-center text-4xl font-bold m-0">Our Brands</h2>
        <p className="grey text-center text-[gray]">
          Choose Your Favorite Brand
        </p>
      </div>

      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center single-brand-logo text-center hover:grayscale-0 grayscale">
              <img
                src={brand?.images}
                alt={`Brand ${index + 1}`}
                className=" object-none h-[94px] w-full !w-[84px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurBrandsCarousel;
