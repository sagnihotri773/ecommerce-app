"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Man from "@/assets/Images/mens-ware.jpg";

export const CategorySlider = ({ categories }) => {

  const getImg = useMemo(() => (img) => img || Man, []);

  return (
    <div className="py-10">
      <div className="mb-14">
        <h2 className="text-center text-4xl font-bold">Our Category</h2>
        <p className="text-center text-gray-600">Choose Category</p>
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
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center">
              <img
                src={getImg(item.image)}
                alt={item?.name}
                className="w-[200px] h-[200px]"
              />
              <span className="text-lg font-semibold mt-2">{item?.name}</span>
              <a
                href={item?.url}
                className="inline-block bg-transparent border border-[#010101] rounded-full text-gray-600 text-sm font-normal leading-none mt-4 py-2 px-3 uppercase"
              >
                SHOP NOW
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
