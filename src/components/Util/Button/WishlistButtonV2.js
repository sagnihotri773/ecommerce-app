import { WishlistSvg } from "@/components/SvgFiles/SvgFile";
import { useTranslations } from "next-intl";
import React from "react";

export default function WishListButtonV2({ callback, isLoading = false }) {
  const t = useTranslations("ProductDetail");
  return (
    <button
      type="button"
      className={`py-2  inline-block flex items-center gap-2 font-semibold tracking-wide uppercase align-middle text-base text-center rounded-md `}
      onClick={(e) => callback()}
      disabled={isLoading}
    >
      <WishlistSvg/> <span className="text-sm text-gray-400">Add to wishlist</span>

    </button>
  );
}
