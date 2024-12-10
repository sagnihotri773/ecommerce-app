"use client";
import { useState } from "react";
import { PreviewNextSvg, PreviewPrevSvg } from "../SvgFiles/SvgFile";

export const QuickView = ({ galleryData, selected }) => {
  const [activeIndex, setActiveIndex] = useState(selected);
 
  return (
    <div>
      <section className="bg-transparent pb-20 dark:bg-dark text-white mt-6">
       
        <div className="container">
          <div>
            <div className="mb-6 relative">
              <button
                className="absolute -left-3/4 top-1/2"
                onClick={() =>
                  setActiveIndex(
                    activeIndex !== galleryData.length - 1 ? activeIndex + 1 : 0
                  )
                }
              >
                <PreviewPrevSvg />
              </button>
              <div className="overflow-hidden rounded-xl w-full max-w-screen-md flex justify-center object-contain items-center bg-white py-4 md:h-[630px] border border-[#00C0F3]">
                {galleryData.map((item, i) => (
                  <img
                    key={i}
                    src={item?.url}
                    alt={item?.label}
                    className={`h-full object-center object-contain ${
                      activeIndex === i ? "block" : "hidden"
                    }`}
                  />
                ))}
              </div>
              <button
                className="absolute -right-3/4 top-1/2"
                onClick={() =>
                  setActiveIndex(
                    activeIndex !== 0 ? activeIndex - 1 : galleryData.length - 1
                  )
                }
              >
                <PreviewNextSvg />
              </button>
            </div>
            <div className="grid grid-cols-5 items-center gap-2 sm:gap-4 md:gap-6 h-[90px]">
              {galleryData?.map((gallery, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`${
                    activeIndex === i
                      ? "border-[#00C0F3] bg-white"
                      : "border-[#545454] bg-[#545454]"
                  } overflow-hidden rounded-lg border lg:rounded-xl flex justify-center items-center`}
                >
                  <img
                    src={gallery?.url}
                    alt={gallery?.label}
                    className="object-cover object-center md:h-[90px]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
