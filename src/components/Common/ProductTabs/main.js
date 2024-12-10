"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const ProductOtherDetailsTabOne = dynamic(() => import("./ProductOtherDetailsTabOne"), { ssr: false });
const ProductOtherDetailsTabTwo = dynamic(() => import("./ProductOtherDetailsTabTwo"), { ssr: false });
const ProductOtherDetailsTabThree = dynamic(() => import("./ProductOtherDetailsTabThree"), { ssr: false });

const productDetailOption = {
  ProductOtherDetailsTabOne,
  ProductOtherDetailsTabTwo,
  ProductOtherDetailsTabThree,
};

export default function ProductOtherDetail({ data, additionalInfo }) {
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  // Memoize the tab name to avoid unnecessary re-renders.
  const productOtherTabName = useMemo(() => {
    if (storeConfigData?.availableStores) {
      return (
        storeConfigData?.availableStores[0]?.layoutSetting?.product_other_details_tab || 
        "ProductOtherDetailsTabOne"
      );
    }
    return "ProductOtherDetailsTabOne"; // Fallback if no tab is found.
  }, [storeConfigData?.availableStores]);

  // If no tab name is available, skip rendering.
  if (!productOtherTabName) return null;

  // Select the correct tab component.
  const SelectedOtherDetailTab = productDetailOption[productOtherTabName];

  return (
    <SelectedOtherDetailTab 
      data={data} 
      additionalInfo={additionalInfo} 
    />
  );
}
