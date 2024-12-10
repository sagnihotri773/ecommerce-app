"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ProductTabMobileView } from "./MobileView";

const DescriptionTab = dynamic(
  () => import("@/components/Common/ProductTabs/DescriprionTab"),
  { ssr: false }
);
const AdditionalInfo = dynamic(
  () => import("@/components/Common/ProductTabs/AdditionalInfo"),
  { ssr: false }
);
const ProductReview = dynamic(
  () => import("@/components/Common/ProductTabs/ProductRating"),
  { ssr: false }
);

export default function ProductOtherDetailsTabTwo({ data }) {
  const [activeTab, setActiveTab] = useState("Additional");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(data?.description);

    if (
      data?.configurable_options?.length > 0 ||
      data?.aggregations?.length > 0
    ) {
      setActiveTab("Additional");
    } else if (data?.description?.html?.length > 0) {
      setActiveTab("Description");
    } else {
      setActiveTab("Reviews");
    }
  }, [data]);

  

  return (
    <>
      <div
        className="hidden sm:flex container m-auto justify-center border-b border-b-[#d7d7d7] pt-7 gap-7 max-sm:flex-col max-sm:gap-2"
        role="tablist"
      >
        <div className="nav-item flex space-x-5 sm:space-x-7">
          {(data?.configurable_options?.length > 0 ||
            data?.aggregations?.length > 0) && (
            <span
              role="tab"
              onClick={() => setActiveTab("Additional")}
              className={`bg-transparent p-2 text-[#666] text-lg font-medium cursor-pointer ${
                activeTab === "Additional"
                  ? "border-b-2 border-b-black"
                  : "border-b-2 border-transparent"
              }`}
            >
              Additional Information
            </span>
          )}

          {description?.html?.length > 0 && (
            <span
              role="tab"
              onClick={() => setActiveTab("Description")}
              className={`bg-transparent p-2 text-[#666] text-lg font-medium cursor-pointer ${
                activeTab === "Description"
                  ? "border-b-2 border-b-black"
                  : "border-b-2 border-transparent"
              }`}
            >
              Description
            </span>
          )}

          <span
            role="tab"
            onClick={() => setActiveTab("Reviews")}
            className={`bg-transparent p-2 text-[#666] text-lg font-medium cursor-pointer ${
              activeTab === "Reviews"
                ? "border-b-2 border-b-black"
                : "border-b-2 border-transparent"
            }`}
          >
            Reviews
          </span>
        </div>
      </div>

      <ProductTabMobileView data={data} description={description} />

      <div className="hidden sm:block container m-auto">
        {activeTab === "Description" && (
          <DescriptionTab description={description} />
        )}
        {activeTab === "Additional" && <AdditionalInfo data={data} />}
        {activeTab === "Reviews" && <ProductReview data={data} />}
      </div>
    </>
  );
}
