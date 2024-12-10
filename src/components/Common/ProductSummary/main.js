"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductSummaryOne = dynamic(() => import('./ProductSummaryOne'), { ssr: false });
const ProductSummaryTwo = dynamic(() => import('./ProductSummaryTwo'), { ssr: false });
const ProductSummaryThree = dynamic(() => import('./ProductSummaryThree'), { ssr: false });
const ProductSummaryFour = dynamic(() => import('./ProductSummaryFour'), { ssr: false });


const productSummaryComponent = {
    ProductSummaryOne,
    ProductSummaryTwo,
    ProductSummaryThree,
    ProductSummaryFour
};

export default function ProductSummary({ data, price, stockStatus = "" }) {
    const [productSummary, setProductSummary] = useState(null);
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setProductSummary(
                storeConfigData?.availableStores[0]?.layoutSetting?.product_summary || "ProductSummaryOne"
            );
        }
    }, [storeConfigData?.availableStores]);

   
    if (!productSummary) {
        return null; 
    }

    const SelectedProductSummary = productSummaryComponent[productSummary];

    return (
        <SelectedProductSummary data={data} price={price} stockStatus={stockStatus} />
    );
};
