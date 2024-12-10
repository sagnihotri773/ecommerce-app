import { useTranslations } from "next-intl";
import React from "react";

export default function AddToCartButtonV3({ callback , isLoading=false}) {
  const t = useTranslations("ProductDetail");
  return (
    <button
      type="button"
      className={`px-5 py-4 uppercase inline-block bg-primary font-semibold text-white tracking-wide align-middle text-sm text-center hover:!bg-white hover:!text-gray-400 border hover:border-black`}
      onClick={(e) => callback()}
      disabled={isLoading}
    >
        {isLoading ? t('Processing') :t('Add to Cart')}
    </button>
  );
}
