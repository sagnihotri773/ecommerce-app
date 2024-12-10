"use client";
import React from "react";
import { getStockStatus } from "@/components/Util/commonFunctions";

import dynamic from "next/dynamic";
const ProductsDescription = dynamic(
  () => import("@/components/Product/Description"),
  { ssr: false }
);
const PriceRating = dynamic(() => import("@/components/Product/PriceRating"), {
  ssr: false,
});

export default function ProductSummaryOne({ data, price, stockStatus = "" }) {
  return (
    <div>
      <h5 className="text-2xl font-semibold"> {data?.name} </h5>
      {data?.__typename !== "GroupedProduct" && (
        <PriceRating data={data} price={price} />
      )}
      <h5 className="text-lg font-semibold">OverView</h5>
      <div className="text-xl">
        <ProductsDescription description={data?.description} />
      </div>
      <span className="text-2xl">
        {getStockStatus(stockStatus || data?.stock_status)}
      </span>
    </div>
  );
}
