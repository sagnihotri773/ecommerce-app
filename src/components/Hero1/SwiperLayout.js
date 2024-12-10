import React from 'react';
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

export default function SwiperLayout({ children }) {
    const swiperSettings = {
        autoplay: {
            delay: 50000,
            disableOnInteraction: false,
        },
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        navigation: true,
        pagination: { clickable: true },
        modules: [Autoplay, Navigation, Pagination],
    };

    return (
        <Swiper {...swiperSettings}>
            {children}
        </Swiper>
    );
}
