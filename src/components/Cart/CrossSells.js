"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// import ProductsPopover from "../Product/ProductsPopover";
import dynamic from 'next/dynamic'
const ProductsPopover = dynamic(() => import('@/components/Product/ProductsPopover'), { ssr: false });
const CardSeven = dynamic(() => import('@/components/Common/ProductCard/CardSeven'), { ssr: false });

export default function CrossSells () {
  const [crossSellsProduct, setCrossSellsProduct] = useState([]);
  const { cart } = useSelector((state) => state.customer);
  const t = useTranslations("ShoppingCart");

  useEffect(() => {
    setCrossSellsProduct(
      cart?.itemsV2?.items?.[0]?.product?.crosssell_products
    );
  }, [cart]);

  return (
    <>
    <div className="container m-auto">
      {crossSellsProduct?.length > 0 ? (
        <p className="px-9 py-3 font-bold">{t("MoreChoices")}</p>
      ) : (
        ""
      )}

      <div className="flex gap-4 px-7 py-3 justify-center">
        {crossSellsProduct?.map((item, index) => (
          <CardSeven products={item} key={index} />
        ))}
      </div>
      </div>
      <ProductsPopover />
    </>
  );
};
