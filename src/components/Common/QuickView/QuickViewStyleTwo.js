import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const QuickViewStyleTwo = ({
  galleryData,
  openGallery,
}) => {


  useEffect(() => {
    if (openGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openGallery]);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative bg-transparent p-4  max-w-screen-lg w-full">
        

        <div className="flex items-center justify-center relative">
          <Swiper
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {galleryData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full object-fill max-h-[700px] transition-transform duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="swiper-pagination !mt-9 gap-4 flex justify-center z-10 !bottom-0" />
      </div>
    </div>
  );
};
