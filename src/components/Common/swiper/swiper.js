"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
    ProductSwipperNextSvg,
    ProductSwipperPrevSvg,
} from "@/components/SvgFiles/SvgFile";

export const DynamicSwiper = ({children, title,position="left"}) => {

    const sliderRef = useRef(null);
    return (
        <div className="py-10 relative">
            <div
                className={`absolute  gap-9 flex m-4 cursor-pointer  ${position === "left" ? "left-40 top-10" : "top-10 right-40"
                    } `}
            >
                <div className="testimonial__btn arrow_blue_left_buttons cursor-pointer hidden md:block">
                    <ProductSwipperPrevSvg className="#F97316" />
                </div>

                <div className="testimonial__btn arrow_blue_right_buttons cursor-pointer hidden md:block">
                    <ProductSwipperNextSvg className="#F97316" />
                </div>
            </div>

            <div className="mb-14">
                <h2 className="text-center text-4xl font-bold m-0">{title}</h2>
            </div>
            <div className="container m-auto">

                <Swiper
                
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}

                    navigation={{
                        prevEl: ".arrow_blue_left_buttons",
                        nextEl: ".arrow_blue_right_buttons",
                    }}
                    ref={sliderRef}
                    loop={true}
                    spaceBetween={30}
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
                    {children}
                </Swiper>
            </div>
        </div>
    );
};
