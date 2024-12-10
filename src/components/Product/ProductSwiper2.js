"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Rating } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import {
  ProductSwipperNextSvg,
  ProductSwipperPrevSvg,
} from "@/components/SvgFiles/SvgFile";
import Image from "next/image";

export const ProductSwiperTwo = ({ products }) => {
  const sliderRef = useRef(null);

  const router = useRouter();
  return (
    <>
      <div className="testimonial w-full flex flex-col items-center py-6 px-1">
        {products?.length > 0 && (
          <div className="max-w-full md:mb-32 flex items-center">
            <div className="testimonial__btn arrow_blue_left_button cursor-pointer hidden md:block">
              <ProductSwipperPrevSvg className="#F97316" />
            </div>
            <Swiper
              modules={[Pagination, Navigation]}
              effect={"carousel"}
              ref={sliderRef}
              navigation={{
                prevEl: ".arrow_blue_left_button",
                nextEl: ".arrow_blue_right_button",
              }}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              pagination={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  carouselEffect: {
                    sideSlides: 1,
                  },
                },
                786: {
                  slidesPerView: 2,
                  carouselEffect: {
                    sideSlides: 1,
                  },
                },
                1200: {
                  slidesPerView: 4,
                  carouselEffect: {
                    sideSlides: 1,
                  },
                },
              }}
              spaceBetween={10}
            >
              {products?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={`flex overflow-hidden relative flex-col items-center px-0 min-h-[530px] w-full md:w-[350px] bg-white rounded-[22px] border-[2px] border-primary`}
                    >
                      <div
                        className={`flex overflow-hidden relative flex-col items-center w-full `}
                      >
                        <div className="h-[290px] flex items-center justify-center py-5 mt-5">
                          <Image
                            src={item?.image?.url}
                            className="h-[250px]"
                            alt={item?.name}
                            layout="fixed"
                            width={300}
                            height={300}
                            loading="lazy"
                          />
                        </div>
                        <div className="relative mt-2 text-xs leading-10 text-center text-white flex flex-col gap-5">
                          <span className="text-2xl font-bold leading-5 text-[#4E4E4E]  ">
                            {item?.name}
                          </span>
                          <span className="text-[40px] font-bold leading-5 text-[#4E4E4E]  ">
                            {products?.sku}
                          </span>
                        </div>
                        <div className="flex relative gap-0 self-center mt-7 max-w-full w-fit items-center leading-tight">
                          <Rating
                            value={Math.round(item.rating_summary / 20)}
                            readonly
                            className="z-10"
                            ratedColor="orange"
                            unratedColor="blue"
                          />
                          <div className="text-lg font-bold text-center text-primary ml-1">
                            {Math.round(item.rating_summary / 20)}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            router.push(`/${item?.url_rewrites?.[0]?.url}`)
                          }
                          className="relative justify-center px-9 py-1 mt-5 mb-5 text-[22px] text-center text-white whitespace-nowrap bg-primary rounded-3xl  "
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="testimonial__btn arrow_blue_right_button cursor-pointer hidden md:block">
              <ProductSwipperNextSvg className="#F97316" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
