import React from "react";
import { useTranslations } from "next-intl";

export default function AddToCartButton({ callback , isLoading=false}) {
  const t = useTranslations("ProductDetail");
  return (
    <button
      type="button"
      className={`${isLoading ? "cursor-progress" : ''} py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-orange-${500 / 5} hover:bg-primary text-primary hover:text-white mt-2`}
      onClick={(e) => callback()}
      disabled={isLoading}
    >
        {isLoading ? t('Processing') :t('Add to Cart')}
    </button>
  );
}
