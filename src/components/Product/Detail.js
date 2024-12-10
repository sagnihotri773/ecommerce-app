"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerStatus } from "@/lib/redux/slices/cartSlice";
import dynamic from "next/dynamic";
import ProductsPopoverStyleTwo from "../Common/Popover/PopOverStyleTwo";
import { Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductDetailStyleThree from "../Common/ProductDetail/ProductDetailThree";
import CardTen from "../Common/ProductCard/CardTen";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextImageSvg, PrevImageSvg } from "../SvgFiles/SvgFile";

const Breadcrumb = dynamic(
  () => import("@/components/Common/BreadCrumbs/index"),
  { ssr: false }
);
const ProductOtherDetailsTabTwo = dynamic(() => import("@/components/Common/ProductTabs/ProductOtherDetailsTabTwo"), { ssr: false });
export default function ProductDetails({ data, loading }) {
  const [productsDetails, setProductsDetails] = useState(data?.items[0]);
  const [additionalInfo, setAdditionalInfo] = useState(data);
  const [productPageData, setProductPageData] = useState(data);
  const [productCardLayoutName, setProductCardLayoutName] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  const breadcrumbs = {
    title: productsDetails?.name,
    pageUrl: "/",
    pageName: productsDetails?.name,
  };

  const [newArrivalProduct, setNewArrivalProduct] = useState(data?.items[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerStatus());
  }, []);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setProductPageData(
        storeConfigData?.availableStores[0]?.staticContent?.productPage
      );
      setProductCardLayoutName(
        storeConfigData?.availableStores[0]?.layoutSetting?.product_card
      );
    }
  }, [storeConfigData?.availableStores]);

  useEffect(() => {
    setProductsDetails(productsDetails);
    setFetchLoading(!productsDetails?.name);
  }, [productsDetails]);
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} showBanner={false} />
      <ProductDetailStyleThree productsDetails={productsDetails} />
      <section className="relative py-2 px-2 min-h-[222px]">
        <ProductOtherDetailsTabTwo
          data={productsDetails}
          additionalInfo={additionalInfo}
        />

        {newArrivalProduct?.related_products?.length > 0 && (
          <div className="container m-auto md:mt-[60px] relative group/item">
            <div className="grid grid-cols-1 mb-6 text-center">
              <h2 className="text-3xl leading-normal">
                You may also like
              </h2>
            </div>
            <div className="md:p-6">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                navigation={{ prevEl: ".previous-arrow", nextEl: ".next-arrow" }}
              >
                {newArrivalProduct.related_products.map((item, index) => (
                  <SwiperSlide key={index}>
                    <CardTen
                      layoutName={productCardLayoutName}
                      product={item}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {newArrivalProduct?.related_products?.length > 4 && (
                <>
                  <div className="absolute top-1/2 left-7 transform -translate-y-1/2 z-50 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <div className="previous-arrow cursor-pointer">
                      <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                        <PrevImageSvg />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 right-7 transform -translate-y-1/2 z-50 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <div className="next-arrow cursor-pointer">
                      <div className="shadow-input cursor-pointer hover:bg-[#b5876d] mx-2 flex h-11 w-11 items-center justify-center bg-white transition-all hover:text-white">
                        <NextImageSvg />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}



      </section>
      <ProductsPopoverStyleTwo />
    </>
  );
}