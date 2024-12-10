import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const CategoryCardOne = dynamic(() => import('@/components/Category/Category'), { ssr: false });
const CategoryCardTwo = dynamic(() => import('@/components/Category/CategoryTwo'), { ssr: false });

const categoryComponents = {
    CategoryOne: CategoryCardOne,
    CategoryTwo: CategoryCardTwo,
};

export default function Main({ categories = {} }) {
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    const categoryLayoutName = useMemo(() => {
        return storeConfigData?.availableStores?.[0]?.layoutSetting?.category_cards || 'CategoryOne';
    }, [storeConfigData]);

    const SelectedCategory = categoryComponents[categoryLayoutName] || CategoryCardOne;

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <SelectedCategory categories={categories} />
        </React.Suspense>
    );
}
