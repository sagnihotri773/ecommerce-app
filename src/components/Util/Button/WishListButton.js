import { useTranslations } from "next-intl";
import React from "react";

export default function WishListButton({ callback , isLoading=false}) {
  const t = useTranslations("ProductDetail");
  return (
    <button
      type="button"
      className={`py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-primary hover:bg-primary text-white hover:bg-orange-400 hover:text-white mt-2`}
      onClick={(e) => callback()}
      disabled={isLoading}
    >
      {isLoading ? t('Processing') :t('AddToWishlist')}
    </button>
  );
}
