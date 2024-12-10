"use client";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { shopUrl } from "@/components/RouteManager";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ProductsPopoverStyleTwo from "@/components/Common/Popover/PopOverStyleTwo";
import LoadingProductCards from "@/components/Product/LoadingProductCards";
import ProductCard from "@/components/Common/ProductCard/ProductCardLayout";
import { useSelector } from "react-redux";
import CardTen from "../Common/ProductCard/CardTen";

export default function PopularItems({ productsList }) {
  const t = useTranslations("Dashboard");
  const [productCardLayoutName, setProductCardLayoutName] = useState("");
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  const upsell_products = productsList?.flatMap((product) =>
    product.upsell_products.map((rewrite) => rewrite)
  );
  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setProductCardLayoutName(
        storeConfigData?.availableStores[0]?.layoutSetting?.product_card
      );
    }
  }, [storeConfigData?.availableStores]);
  return (
    <div className="container m-auto relative md:mt-24 mt-16">
      {upsell_products?.length > 0 ? (
        <div className="grid items-end md:grid-cols-2 mb-6">
          <div className="md:text-start text-center">
            <h4 className="font-semibold text-3xl leading-normal mb-4">
              {t("Popular_Items")}
            </h4>
            <p className="text-black max-w-xl">{t("PopularThisWeek")}</p>
          </div>
          <div className="md:text-end hidden md:block">
            <Link
              className="text-black hover:text-primary"
              href={shopUrl}
              prefetch={true}
            >
              {t("SeeMore")} <i className="mdi mdi-arrow-right" />
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:p-0 p-[38px]">
        {productsList?.length > 0 ? (
          upsell_products
            ?.slice(0, 5)
            ?.map((val, index) => (
              <CardTen
                key={index}
                layoutName={productCardLayoutName}
                product={val}
              />
            ))
        ) : (
          <LoadingProductCards />
        )}
      </div>
      <ProductsPopoverStyleTwo />

      <div className="grid grid-cols-1 mt-6">
        <div className="text-center md:hidden block">
          <Link className="text-slate-400 hover:text-primary" href="/" prefetch={true}>
            See More Items <i className="mdi mdi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
