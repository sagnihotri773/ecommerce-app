"use client";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "@/components/ui/Link";
import { SwiperSlide } from "swiper/react";
import SwiperLayout from "@/components/Hero1/SwiperLayout";
import { GET_CAROUSELS_BY_CATEGORY } from "@/lib/graphql/queries/category";
import { useQuery } from "@apollo/client";
import { shopUrl } from "@/components/RouteManager";
import Image from "next/image";

export default function Index() {
  const sliderRef = useRef(null);
  const { loading, error, data } = useQuery(GET_CAROUSELS_BY_CATEGORY, {
    variables: { identifier: 'home' },
    fetchPolicy: 'no-cache',
  });

  // State to manage the slides after data is fetched
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (data && data.getCarouselsByCategoryIdentifier) {
      setSlides(data.getCarouselsByCategoryIdentifier);
    }
  }, [data]);

  return (
    <div className="main-section">
      {slides.length > 0 ? (
        <SwiperLayout ref={sliderRef}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <section
                className="slide-inner relative end-0 top-0 w-full h-full slide-bg-image bg-blue-600/5 flex items-center md:bg-top bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${typeof window !== 'undefined' && window.innerWidth < 768 ? slide.mobile_image : slide.image})`,
                  height: '100vh',
                  minHeight: '500px',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div>

                <div className="m-auto md:m-[232px] relative">
                  <div className="grid grid-cols-1 justify-center z-50">
                    <div className={`text-start w-[100%] px-2`}>
                      <h4 className="text-4xl font-semibold font-normal my-3 text-white">
                        {slide.text}
                      </h4>
                      <div className="mt-6">
                        <Link
                          className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-primary dark:bg-primary text-white rounded-md"
                          href={shopUrl}
                          prefetch={true}
                        >
                          Shop <i className="mdi mdi-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </SwiperLayout>
      ) :
        loading && slides.length == 0 ? <div
          className="w-full h-[500px] md:h-[100vh] bg-gray-300 animate-pulse"
          style={{ minHeight: '500px', maxWidth: '1920px', height: 'auto' }}
        />
          : ''}
    </div>
  );
}
