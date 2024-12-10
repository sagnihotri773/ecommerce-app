"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShopPageSidebarOne = dynamic(() => import("./ShopPageSidebarOne"), {
  ssr: false,
});
const ShopPageSidebarTwo = dynamic(() => import("./ShopPageSidebarTwo"), {
  ssr: false,
});
const ShopPageSidebarThree = dynamic(() => import("./ShopPageSidebarSix"), {
  ssr: false,
});
const ShopPageSidebarFour = dynamic(() => import("./ShopPageSidebarFour"), {
  ssr: false,
});
const ShopPageSidebarFive = dynamic(() => import("./ShopPageSidebarFive"), {
  ssr: false,
});
const ShopPageSidebarSix = dynamic(() => import("./ShopPageSidebarSix"), {
  ssr: false,
});

const shopSidebarFiltee = {
  ShopPageSidebarOne,
  ShopPageSidebarTwo,
  ShopPageSidebarThree,
  ShopPageSidebarFour,
  ShopPageSidebarFive,
  ShopPageSidebarSix
};

export default function ShopPageSidebar({
  filterValue = "",
  page,
  sort,
  setPage,
  attributesData,
  categoryPageData,
  FilterVisible,
  setSelectedFilterOption,
}) {
  const [sidebarName, setSideBarName] = useState("");
  const [loading, setLoading] = useState(true);
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setSideBarName(
        storeConfigData?.availableStores[0]?.layoutSetting?.shop_page_sidebar ||
          "ShopPageSidebarOne"
      );
      setLoading(false); // Data has been fetched
    }
  }, [storeConfigData?.availableStores]);

  const SelectedSidebar = shopSidebarFiltee[sidebarName] || ShopPageSidebarOne;

  return (
    <div>
      {loading ? (
        <div className="space-y-4">
          {/* Skeleton Loader */}
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
        </div>
      ) : (
        <SelectedSidebar
          filterValue={filterValue}
          sort={sort}
          attributesData={attributesData}
          page={page}
          setPage={setPage}
          FilterVisible={FilterVisible}
          categoryPageData={categoryPageData}
          setSelectedFilterOption={setSelectedFilterOption}
        />
      )}
    </div>
  );
}
