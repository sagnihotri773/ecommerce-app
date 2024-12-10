import ShareProductTwo from "@/components/Common/ShareProduct/ShareProductTwo";
import { useTranslations } from "next-intl";
import React, { useState } from "react";


export default function WishListButtonV3({ callback, isLoading = false }) {
  const t = useTranslations("ProductDetail");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverOpenHide = () => {
    setPopoverOpen(!popoverOpen);
  };
  return (
    <>

      <div className="flex items-center gap-3 !m-0 pt-1 ">
        <button
          type="button"
          className={`py-2  inline-block flex items-center gap-2  tracking-wide align-middle text-sm text-center rounded-md `}
          onClick={(e) => callback()}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 22 20"
            fill="none"
          >
            <path
              d="M19.3115 2.46071C16.9773 0.0803204 14.2743 1.08425 12.6007 2.14593C11.655 2.74582 10.345 2.74582 9.39929 2.14593C7.72564 1.08427 5.02272 0.0803466 2.68853 2.46072C-2.85249 8.11136 6.64988 19 11 19C15.3502 19 24.8525 8.11136 19.3115 2.46071Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <span className="font-semibold text-sm">Wishlist</span>
        </button>
        <button onClick={() => popoverOpenHide()} className="flex items-center gap-2 font-semibold text-[#111111] hover:text-[#111111]/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 18C2 10 10 6 18 6M18 6L14 12M18 6L12 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path>
          </svg>
          Share
        </button>

        {popoverOpen ? <ShareProductTwo
          closeLayout={() => popoverOpenHide()}
          openLayout={popoverOpen}
        /> : ''}
      </div>
      <div className="bg-[#e3e3e3] h-[2px] mt-3"></div>
    </>
  );
}
