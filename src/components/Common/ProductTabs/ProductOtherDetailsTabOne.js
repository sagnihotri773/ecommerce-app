import ProductAdditionalInformation from "@/components/Product/AdditionalInformation";
import ProductsDescription from "@/components/Product/Description";
import { OtherDetails } from "@/components/Product/Extra";
import ProductsReview from "@/components/Product/Review";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { ProductTabMobileView } from "./MobileView";

export default function ProductOtherDetailsTabOne(props) {
  const t = useTranslations("ProductDetail");
  const { data, additionalInfo } = props;
  const [showDetailsProducts, setShowDetailsProducts] = useState(0);

  

  return (
    <>
    <div className="hidden sm:block container m-auto relative ">
      <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
        <div className="lg:col-span-3 md:col-span-5">
          <div className="sticky top-20">
            <div className="flex-column p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
              {OtherDetails?.map((val, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-primary duration-500 ${
                    showDetailsProducts === index
                      ? "text-white bg-primary hover:text-white"
                      : ""
                  }`}
                  onClick={() => setShowDetailsProducts(index)}
                >
                  {t(val?.title)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 md:col-span-7">
          <div
            id="myTabContent"
            className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
          >
            {showDetailsProducts === 0 ? (
              <ProductsDescription description={data?.description} />
            ) : showDetailsProducts === 1 ? (
              additionalInfo && (
                <ProductAdditionalInformation data={additionalInfo} />
              )
            ) : showDetailsProducts === 2 ? (
              <ProductsReview
                customerReviews={data?.reviews?.items}
                data={data}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
    <ProductTabMobileView data={data} description={data?.description}/>
    </>
  );
}
