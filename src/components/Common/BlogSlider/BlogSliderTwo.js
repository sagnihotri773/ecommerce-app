"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GET_BLOG_POST } from "@/lib/graphql/queries/blog";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@apollo/client";
// import "swiper/css";
// import "swiper/css/pagination";
import { NextImageSvg, PrevImageSvg } from "@/components/SvgFiles/SvgFile";
import Image from "next/image";

export default function BlogSlider() {
  const router = useRouter();
  const [blogData, setBlogData] = useState();
  const { data: blogPostData } = useQuery(GET_BLOG_POST, {
    variables: { currentPage: 1, pageSize: 5 },
  });

  const truncateDescription = (description) => {
    if (description?.length > 60) {
      return `${description.substring(0, 60)}...`;
    }
    return description;
  };

  const formatPostDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    return formattedDate;
  };

  useEffect(() => {
    setBlogData(blogPostData?.mpBlogPosts?.items);
  }, [blogPostData]);

  return (
    <>
      <div className="container m-auto px-4 py-8 relative">
        <div className="flex justify-between">
          {blogData?.length > 0 && (
            <>
              <p className="text-center text-3xl font-normal text-gray-800 mb-6 relative">
                Fashion News
              </p>

              <Link className="font-medium" href="/blog">
                See More
              </Link>
            </>
          )}
        </div>
        <div className="swiper-wrapper relative group/item">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ prevEl: ".prev-arrow", nextEl: ".next-arrow" }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            spaceBetween={30}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogData?.slice(0, 6)?.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white relative overflow-hidden  transition-shadow duration-300">
                  <div className="relative">
                    <Image
                      src={product?.image}
                      alt={product?.name || "Blog post image"}
                      width={600} // Specify width
                      height={400} // Specify height
                      className="w-full md:h-64 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                      onClick={() => router.push(`/blog/post/${product?.url_key}`)}
                      loading="lazy"
                      quality={60}
                    />
                    {/* <img
                      src={product?.image}
                      alt={product?.name || "Blog post image"}
                      className="w-full md:h-64 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                      onClick={() =>
                        router.push(`/blog/post/${product?.url_key}`)
                      }
                    /> */}
                    <div className="absolute top-0 right-0 bg-primary text-black px-4 py-2 text-start">
                      <span className="text-lg font-semibold flex justify-center">
                        {formatPostDate(product?.created_at)?.split(" ")[0]}
                      </span>
                      <span className="text-sm uppercase">
                        {formatPostDate(product?.created_at)?.split(" ")[1]}
                      </span>
                    </div>
                  </div>
                  <div className="py-5 text-start">
                    <h2 className="text-md font-bold text-gray-800 mb-3">
                      {product?.name}
                    </h2>
                    <p className="text-gray-600 text-1xl font-normal mb-4">
                      {truncateDescription(product?.short_description)}
                    </p>
                    <Link
                      href={`/blog/post/${product?.url_key}`}
                      className="inline-block text-sm font-medium text-black hover:text-[#b5876d] transition-colors group relative"
                    >
                      Read More
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b5876d] transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 opacity-0 group-hover/item:opacity-100 transition-opacity">
            <div className="prev-arrow cursor-pointer">
              <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                <PrevImageSvg />
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50 opacity-0 group-hover/item:opacity-100 transition-opacity">
            <div className="next-arrow cursor-pointer">
              <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                <NextImageSvg />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">

          <div className="swiper-pagination gap-4 z-10 !b-[104px] md:hidden" />
        </div>
      </div>
    </>
  );
}
