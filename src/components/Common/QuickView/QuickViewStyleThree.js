"use client";
import { PreviewNextSvg, PreviewPrevSvg } from "@/components/SvgFiles/SvgFile";
import { useState } from "react";

export const QuickViewStyleThree = ({ galleryData, selected }) => {
  const [activeIndex, setActiveIndex] = useState(selected);

  return (
    <div className="w-full">
      <section className="bg-transparent pb-20  text-white mt-6">
        <div className="container">
          <div>
            <div className="mb-6 relative">
              <button
                className="absolute -left-3/4 top-1/2 "
                onClick={() =>
                  setActiveIndex(
                    activeIndex !== galleryData.length - 1 ? activeIndex + 1 : 0
                  )
                }
              >
                <PreviewPrevSvg />
              </button>
              <div className="overflow-hidden rounded-xl w-full max-w-screen-md flex justify-center object-contain items-center bg-white md:h-[630px] border border-[#00C0F3]">
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
          </div>
        </div>
      </section>
    </div>
  );
};
