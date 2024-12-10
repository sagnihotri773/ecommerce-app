"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Link } from "@/components/ui/Link";
import { SwiperSlide } from "swiper/react";
import SwiperLayout from "@/components/Hero1/SwiperLayout";
import { GET_CAROUSELS_BY_CATEGORY } from "@/lib/graphql/queries/category";
import { useQuery } from "@apollo/client";
import { shopUrl } from "@/components/RouteManager";
import Image from "next/image";
import styles from "./Index.module.css";
import { authToken } from "@/components/Util/commonFunctions";
import { customerStatus } from "@/lib/redux/slices/cartSlice";
import { useDispatch } from "react-redux";


const LoadingSkeleton = () => (
  <div className="w-full h-[500px] md:h-screen bg-gray-300 animate-pulse" />
);

export default function Index() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [slides, setSlides] = useState([]);

  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_CAROUSELS_BY_CATEGORY, {
    variables: { identifier: "home" },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    localStorage.setItem("userType", authToken ? "customer" : "guest");
    dispatch(customerStatus());
  }, [authToken, dispatch]);

  useEffect(() => {
    if (data?.getCarouselsByCategoryIdentifier) {
      setSlides(data.getCarouselsByCategoryIdentifier);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CarouselContent = () => {
    if (slides.length > 0) {
      return (
        <SwiperLayout ref={sliderRef}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative flex items-center ${styles.animated} pt-24 md:h-screen min-h-[500px]`}
              >
                <Image
                  src={isMobile ? slide.mobile_image : slide.image}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  quality={isMobile ? 40 :60}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="absolute w-full h-full"
                />
                <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center md:justify-between">
                  <div className="w-full md:w-1/2 text-center relative md:bottom-24">
                    <h1
                      className={`text-3xl md:text-5xl font-normal text-gray-800 leading-tight ${styles.fadeInUp} ${styles.animated}`}
                    >
                      {slide.heading}
                    </h1>
                    <p
                      className={`mt-4 text-base md:text-lg text-gray-600 ${styles.fadeInUp} ${styles.animated}`}
                    >
                      {slide?.text}
                    </p>
                    <button
                      className={`mt-6 px-4 md:px-6 py-2 md:py-3 text-black border-2 bg-transparent hover:bg-white border-black hover:border-transparent shadow-lg transition duration-300 ${styles.fadeInUp} ${styles.animated}`}
                    >
                      <Link href={shopUrl} prefetch={true}>
                        SHOP NOW <i className="mdi mdi-arrow-right" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwiperLayout>
      );
    }

    if (loading) {
      return <LoadingSkeleton />;
    }

    return <p>No slides available.</p>;
  };

  return (
    <div className="main-section">
      <Suspense fallback={<LoadingSkeleton />}>
        <CarouselContent />
      </Suspense>
    </div>
  );
}
