"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCart } from "@/lib/redux/slices/cartSlice";
import { SlidersHorizontal } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_ID } from "@/lib/graphql/queries/category";
import { renderHtmlDynamic } from "../Util/commonFunctions";

import dynamic from "next/dynamic";
import { getDynamicData } from "../Util/commonGraphQuery";
import ShopPageSidebar from "../Common/ShopPageSideFilter/main";
import ProductsPopoverStyleTwo from "@/components/Common/Popover/PopOverStyleTwo";

const MobileViewFilter = dynamic(() => import("@/components/Category/MobileViewFilter"),{ ssr: false });
const FilterProduct = dynamic(() => import("@/components/Category/FilterProduct"),{ ssr: false });
const ProductListing = dynamic(() => import("@/components/Category/Listing"), {ssr: false});
const ProductCard = dynamic(() => import("@/components/Common/ProductCard/ProductCardLayout"),{ ssr: false });
const Breadcrumbs = dynamic(() => import("@/components/Common/BreadCrumbs/Breadcrumbs"),{ ssr: false });

export default function Shop({
  categoryProducts = {},
  categoryItems = [],
  categoryUID = "",
  categoryID = 0,
  loading: fetchDataLoading
}) {
  const [products, setProducts] = useState(categoryItems);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(categoryProducts);
  const [sortField, setSortField] = useState("name_ASC");
  const [view, setView] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const { cart_id } = useSelector((state) => state.customer);
  const [mobileFilterOpenClose, setMobileFilterOpenClose] = useState(false);
  const [breadcrumbsData, setBreadcrumbsData] = useState({});
  const [categoryPageData, setCategoryPageData] = useState({});
  const [productCardLayoutName, setProductCardLayoutName] = useState("");
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
  const [getFilterSidebarName, setGetFilterSidebarName] = useState();
  const [fetchData, setFetchData] = useState(true);
  const dispatch = useDispatch();

  const {
    loading,
    error,
    data: BreadcrumbsData,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { id: Number(categoryID || 0) },
  });

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setCategoryPageData(
        storeConfigData?.availableStores[0]?.staticContent?.categoryPage
      );
      setProductCardLayoutName(
        storeConfigData?.availableStores[0]?.layoutSetting?.product_card
      );
      setGetFilterSidebarName(
        storeConfigData?.availableStores[0]?.layoutSetting?.shop_page_sidebar
      );
    }
  }, [storeConfigData?.availableStores]);

  useEffect(() => {
    if (!loading) {
      if (BreadcrumbsData?.category) {
        setBreadcrumbsData(BreadcrumbsData.category);
      } else {
        setBreadcrumbsData({ name: "Shop" });
      }
    }
  }, [loading, BreadcrumbsData]);

  useEffect(() => {
    setData(categoryProducts);
  }, [categoryProducts]);

  useEffect(() => {
    return () => {
      setFetchData(true)
      setData({});
      setProducts([])
    };
  }, []);

  useEffect(() => {
    if (!cart_id) {
      dispatch(initCart());
    }
  }, [cart_id, dispatch]);

  useEffect(() => {
    if (page > 1) {
      setProducts((prevProducts) => [...prevProducts, ...categoryItems]);
      setFetchData(fetchDataLoading)
    } else if (page === 1) {
      setProducts(categoryItems);
      setFetchData(fetchDataLoading)
    }
  }, [categoryItems, page]);

  const handleSortByFilter = useCallback((value) => {
    setSortField(value);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const openMobileFilter = useCallback((value) => {
    setMobileFilterOpenClose(value);
  }, []);

  const fetchMoreData = useCallback(() => {
    if (products.length < data?.total_count) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [products.length, data?.total_count]);

  const getFilterValue = categoryUID ? categoryUID : {};

  const isLoading = products?.length > 0 ? false : true

  return (
    <div>
      <Breadcrumbs breadcrumbsData={breadcrumbsData} loading={loading} />
      <section className="relative md:py-15 py-10 px-5 mb-4">
        {renderHtmlDynamic(categoryPageData?.topContent)}
        <div className="container m-auto relative">
          <div
            className={
              (getFilterSidebarName === "ShopPageSidebarOne" || getFilterSidebarName === "ShopPageSidebarTwo")
                ? "grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6"
                : ""
            }
          >
            {showFilters && (
              <div className={`lg:col-span-3 md:col-span-4 hidden md:block`}>
                <ShopPageSidebar
                  filterValue={getFilterValue}
                  sort={sortField}
                  attributesData={categoryProducts?.aggregations}
                  page={page}
                  setPage={setPage}
                  categoryPageData={categoryPageData}
                />
              </div>
            )}
            <div className="block md:hidden">
              <div className="flex justify-between items-center py-4 border-gray-200">
                <div className="text-md text-bold">
                  {products.length} Results
                </div>
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => openMobileFilter(true)}
                >
                  <span>Filter</span>
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>
              <MobileViewFilter
                isOpen={mobileFilterOpenClose}
                onClose={openMobileFilter}
                data={data}
                filterValue={getFilterValue}
                page={page}
                setPage={setPage}
              />
            </div>

            <div
              className={`lg:col-span-${!showFilters ? 12 : 9} md:col-span-8`}
            >
              {products.length > 0 && (
                <div className="border-b md:border-none mb-2 md:mb-0">
                  <FilterProduct
                    handleSortByFilter={handleSortByFilter}
                    data={data}
                    length={products.length}
                    setView={setView}
                    view={view}
                    toggleFilters={toggleFilters}
                    sort={showFilters}
                  />
                </div>
              )}
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={products.length < data?.total_count}
                scrollThreshold={0.8}
                scrollableTarget="scrollableDiv"
                scrollToTop={false} // Prevents scrolling to the top
              >
                {fetchData ? (
                  <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="animate-pulse space-y-4 p-4 border border-gray-300 rounded-md"
                      >
                        <div className="h-48 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div
                    className={`
                    ${view ? "grid" : ""}
                    ${(getFilterSidebarName !== "ShopPageSidebarOne" || getFilterSidebarName !== "ShopPageSidebarTwo")
                        ? "lg:grid-cols-4"
                        : "lg:!grid-cols-3"
                      }
                    md:grid-cols-2 grid-cols-1 gap-6
                  `}
                  >
                    {view
                      ? products.map((val, index) => (
                        <ProductCard
                          key={index}
                          layoutName={productCardLayoutName}
                          product={val}
                        />
                      ))
                      : products.map((val, index) => (
                        <div className="grid grid-cols-1 gap-6" key={index}>
                          <ProductListing products={val} />
                        </div>
                      ))}
                  </div>
                ) :
                  isLoading && !fetchData ? <h5 className="text-center font-bold text-3xl flex justify-center mt-32 items-center">
                    No Product Found
                  </h5> : ''
                }
              </InfiniteScroll>
            </div>
            <ProductsPopoverStyleTwo />
          </div>
        </div>
        {renderHtmlDynamic(categoryPageData?.bottomContent)}
      </section>
    </div>
  );
}
