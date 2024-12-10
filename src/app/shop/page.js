import React, { Suspense } from "react";
import getCategoryData from "@/server/category";
import dynamic from "next/dynamic";
const Shop = dynamic(() => import('@/components/Category/ShopTwo'), { ssr: false });
import ShopLoading from '@/components/LoadingLayouts/shopLoading';
import { FilterProvider } from "@/components/Util/context/FilterContext";

export async function generateMetadata() {
  return {
    title: "Shop",
    description: "Explore a wide range of fashion products on our shop page.",
    robots: "index, follow",
    openGraph: {
      title: "Shop",
      description: "Explore a wide range of fashion products on our shop page.",
    },
  };
}

export default async function Index(context) {
  const { searchParams } = context;
  const { categoryProducts, categoryItems, loading } = await getCategoryData({ searchParamsValue: searchParams });

  return (
    <Suspense fallback={<ShopLoading />}>
      <FilterProvider>
        <Shop categoryProducts={categoryProducts} categoryItems={categoryItems} loading={loading} />
      </FilterProvider>
    </Suspense>
  );
}