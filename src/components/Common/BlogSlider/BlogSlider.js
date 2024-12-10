"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GET_BLOG_POST } from "@/lib/graphql/queries/blog";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@apollo/client";
import "swiper/css";
import "swiper/css/pagination";
import { NextImageSvg, PrevImageSvg } from "@/components/SvgFiles/SvgFile";

export default function BlogSlider() {
  const router = useRouter();
  const [blogData, setBlogData] = useState();
  const { data: blogPostData } = useQuery(GET_BLOG_POST, {
    variables: { currentPage: 1, pageSize: 10 },
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

              <p className="text-center text-lg font-bold uppercase text-gray-800 mb-6 relative">
                Latest from Blog
              </p>

              <Link className="font-bold" href="/blog">
                See more
              </Link>
            </>
          )}


        </div>
        <div className="swiper-wrapper relative group">
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
                <div className="bg-white relative shadow-md hover:shadow-xl rounded-lg overflow-hidden border border-gray-200 transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product?.image}
                      alt={product?.name || "Blog post image"}
                      className="w-full md:h-64 object-cover transition-transform duration-700 hover:scale-110 cursor-pointer"
                      onClick={() =>
                        router.push(`/blog/post/${product?.url_key}`)
                      }
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 text-center">
                      <span className="text-lg font-semibold">
                        {formatPostDate(product?.created_at)?.split(" ")[0]}
                      </span>
                      <br />
                      <span className="text-sm uppercase">
                        {formatPostDate(product?.created_at)?.split(" ")[1]}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h2 className="text-md font-bold text-gray-800 mb-3">
                      {product?.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {truncateDescription(product?.short_description)}
                    </p>
                    <Link
                      href={`/blog/post/${product?.url_key}`}
                      className="inline-block text-sm font-medium text-primary hover:text-primary-dark transition-colors uppercase"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="prev-arrow cursor-pointer">
              <button className="shadow-input hover:bg-primary mx-2 flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:text-white">
                <PrevImageSvg />
              </button>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="next-arrow cursor-pointer">
              <button className="shadow-input hover:bg-primary mx-2 flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:text-white">
                <NextImageSvg />
              </button>
            </div>
          </div>
        </div>

        <div className="swiper-pagination gap-2 flex justify-center z-10 !b-[104px]" />
      </div>
    </>
  );
}
