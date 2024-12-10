import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@apollo/client";
import { GET_FIVE_STAR_REVIEWS } from "@/lib/graphql/queries/customer";
import { Rating } from "@material-tailwind/react";
// import dummyUserImage from "@/assets/Images/DummyUser.png";
import { NextImageSvg, PrevImageSvg } from "@/components/SvgFiles/SvgFile";
// import "swiper/css";
// import "swiper/css/pagination";

const Reviews = () => {
  const { loading, error, data } = useQuery(GET_FIVE_STAR_REVIEWS, {
    variables: { limit: 50 },
  });
  const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    if (data?.fiveStarReviews) {
      setReviewData(data?.fiveStarReviews);
    }
  }, [data?.fiveStarReviews]);

  return (
    <>
      {reviewData?.length > 0 && (
        <section className="pt-6 pb-12 relative container m-auto md:w-3/5 md:justify-center group">
          {/* <h2 className="text-center text-2xl font-bold mb-8 relative">
            What Client Says
          </h2> */}

          <div className="flex justify-center pb-6">
            <span class="icon-content relative top-0 left-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="126" height="91" viewBox="0 0 126 91" fill="none">
                <g opacity="0.1">
                  <path d="M0.554688 36.1726H54.653V90.271H0.554688V36.1726Z" fill="#155AFA"></path>
                  <path d="M0.554688 36.1726H27.6039L44.817 0.270996H17.7678L0.554688 36.1726Z" fill="#155AFA"></path>
                  <path d="M71.8672 36.1726H125.966V90.271H71.8672V36.1726Z" fill="#155AFA"></path>
                  <path d="M71.8672 36.1726H98.9164L116.129 0.270996H89.0803L71.8672 36.1726Z" fill="#155AFA"></path>
                </g>
              </svg>
            </span>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            navigation={{
              prevEl: ".review-prev-arrow",
              nextEl: ".review-next-arrow",
            }}
            pagination={{ clickable: true, el: ".review-swiper-pagination" }}
            spaceBetween={30}
            slidesPerView={1}
            className="w-11/12 mx-auto"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
          >
            {reviewData?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-center m-auto relative md:px-4 md:w-5/6 ">
                  {/* <img
                    src={dummyUserImage?.src}
                    alt={"Image"}
                    className="w-20 h-20 rounded-full mx-auto mb-4 hidden"
                  /> */}
                  <h3 className="text-2xl font-normal"> {item?.nickname}</h3>
                  <p className="text-1xl font-normal text-gray-500 py-4">{item.detail}</p>
                  <div className="flex justify-center mt-2">
                    <Rating key={index} value={Number(item?.rating)} readonly className='text-yellow-400' />
                  </div>
                  <p className="mt-4 text-gray-700">{item?.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="review-prev-arrow cursor-pointer">
              <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                <PrevImageSvg />
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="review-next-arrow cursor-pointer">
              <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                <NextImageSvg />
              </div>
            </div>
          </div>
        </section>
      )}
      {reviewData?.length > 0 && (
        <div className="review-swiper-pagination gap-2 flex justify-center z-10 !b-[104px] md:hidden" />
      )}
    </>
  );
};

export default Reviews;
