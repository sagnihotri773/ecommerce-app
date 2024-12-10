"use client"
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic';
const ProductsPopoverStyleTwo = dynamic(() => import('../Common/Popover/PopOverStyleTwo'));
const LoadingProductCards = dynamic(() => import('@/components/Product/LoadingProductCards'));
const MobileProductsLayout = dynamic(() => import('@/components/Category/MobileProductsLayout'));
const CardTen = dynamic(() => import('@/components/Common/ProductCard/CardTen'));

// const ProductCard = dynamic(() => import('@/components/Common/ProductCard/ProductCardLayout'), { ssr: true });
// import LoadingProductCards from '@/components/Product/LoadingProductCards'
import { useSelector } from "react-redux";

const NewArrival = React.memo(({ productsList = [] }) => {
    const [productCardLayoutName, setProductCardLayoutName] = useState('');
    const t = useTranslations("Dashboard");
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setProductCardLayoutName(storeConfigData?.availableStores[0]?.layoutSetting?.product_card);
        }
    }, [storeConfigData?.availableStores])

    return (
        <div className="container m-auto relative ">
            {/* Parent container for h1 and p */}
            <div className="text-start mb-6">
                <h1 className="font-normal text-3xl leading-normal mb-4 px-4 md:px-0">
                    {t("NewArrivals")}
                </h1>
                <p className="text-black max-w-xl px-4 md:px-0">
                    {t("ShopLatestCollections")}
                </p>
            </div>

            {/* Product grid */}
            <div className="lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-0 md:gap-8 gap-4 hidden md:grid">
                {productsList?.length > 0 ? (
                    productsList?.map((val, index) => (
                        <CardTen
                            key={index}
                            layoutName={productCardLayoutName}
                            product={val}
                            className="min-h-[300px] aspect-[4/5]"
                        />
                    ))
                ) : (
                    <LoadingProductCards />
                )}


            </div>
            <div className={`grid-cols-2 gap-4 grid md:hidden px-4`}>
                {productsList?.length > 0 ? (
                    productsList.map((product) => (
                        <MobileProductsLayout product={product} />
                    ))) : ''}
            </div>
            <ProductsPopoverStyleTwo loading="lazy" />
        </div>

    );
});

export default NewArrival;
