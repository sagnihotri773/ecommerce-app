"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCart } from "@/lib/redux/slices/cartSlice";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_ID } from "@/lib/graphql/queries/category";
import dynamic from "next/dynamic";
import CategoriesThree from "./CategoriesThree";
import { LayoutList } from 'lucide-react'
import { Button } from "../ui/button";
import MobileProductsLayout from "./MobileProductsLayout";
import { startLoading, stopLoading } from "@/lib/redux/slices/loadingSlice";
import CardTen from "../Common/ProductCard/CardTen";
import { filterClass } from "@/components/Category/FilterProduct";
import SortAndViewToggle from "./SortAndViewToggle";

const MobileViewFilter = dynamic(() => import("@/components/Category/MobileViewFilter"), { ssr: false });
const Breadcrumbs = dynamic(() => import("@/components/Common/BreadCrumbs/Breadcrumbs"), { ssr: false });
const InfiniteScroll = dynamic(() => import("react-infinite-scroll-component"), { ssr: false });
const ShopPageSidebar = dynamic(() => import("@/components/Common/ShopPageSideFilter/main"));
const FilterTags = dynamic(() => import("@/components/Category/FilterTags"));




export default function ShopTwo({
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
    const [showFilters, setShowFilters] = useState(true);
    const { cart_id } = useSelector((state) => state.customer);
    const [mobileFilterOpenClose, setMobileFilterOpenClose] = useState(false);
    const [breadcrumbsData, setBreadcrumbsData] = useState({});
    const [categoryPageData, setCategoryPageData] = useState({});
    // const [productCardLayoutName, setProductCardLayoutName] = useState("");
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
    // const [getFilterSidebarName, setGetFilterSidebarName] = useState();
    const [fetchData, setFetchData] = useState(true);
    const dispatch = useDispatch();

    const [gridView, setGridView] = useState('grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
    const [gridViewMobile, setGridViewMobile] = useState('grid-cols-2')

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
            // setProductCardLayoutName(
            //     storeConfigData?.availableStores[0]?.layoutSetting?.product_card
            // );
            // setGetFilterSidebarName(
            //     storeConfigData?.availableStores[0]?.layoutSetting?.shop_page_sidebar
            // );
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
            setFetchData(fetchDataLoading);
            dispatch(stopLoading());
        } else if (page === 1) {
            setProducts(categoryItems);
            setFetchData(fetchDataLoading);
            dispatch(stopLoading());
        }
    }, [categoryItems, page]);

    const handleSortByFilter = useCallback((value) => {
        setSortField(value);
        dispatch(startLoading());
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
    const fetchCatg = BreadcrumbsData === undefined && !loading;
    const catName = ![undefined, null].includes(breadcrumbsData?.name);

    return (
        < >
            <Breadcrumbs breadcrumbsData={breadcrumbsData} loading={loading} showBanner={false} />
            <>
                <CategoriesThree data={BreadcrumbsData?.category?.children} fetchData={fetchCatg} BreadcrumbsData={BreadcrumbsData} />
                {BreadcrumbsData?.category?.description && (
                    <div className="container mx-auto md:pt-10">
                        <div className="flex flex-col md:flex-row md:p-0 p-[10px]">

                            <div className="w-full md:w-1/4  md:mb-0 md:block hidden"></div>

                            <div className="w-full md:w-3/4 md:pl-8">

                                <h1
                                    dangerouslySetInnerHTML={{
                                        __html: BreadcrumbsData?.category?.description,
                                    }}
                                    className="text-base md:text-xl"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="container mx-auto md:py-[60px]">
                    <div className="flex flex-col md:flex-row md:p-0 p-[10px]">
                        {products?.length > 0 && (

                            <div className="w-full md:w-1/4 mb-6 md:mb-0 md:block hidden">
                                {showFilters && (
                                    <ShopPageSidebar
                                        filterValue={getFilterValue}
                                        sort={sortField}
                                        attributesData={categoryProducts?.aggregations}
                                        page={page}
                                        setPage={setPage}
                                        categoryPageData={categoryPageData}
                                        FilterVisible={true}
                                    />
                                )}
                            </div>
                        )}
                        <div className="block md:hidden">
                            <div className="flex justify-between items-center py-4 border-gray-200 ">
                                <div className="text-md text-bold">
                                    {catName ? <h3 className="font-bold"> {breadcrumbsData?.name} <span className="bg-[#e4e4e4] p-1 rounded ml-2 text-[#111111]" > {products.length} </span> </h3> :
                                        <div className="h-8 w-[100px] bg-gray-200 dark:bg-slate-600 rounded"></div>}
                                </div>
                                <button
                                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 md:flex hidden"
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
                                attributesData={categoryProducts?.aggregations}
                                FilterVisible={true}
                            />
                        </div>
                        {products?.length > 0 ? (
                            <div className="w-full md:w-3/4 md:pl-8">
                                <div className="flex justify-between items-center mb-4 md:flex hidden">
                                    <h2 className="">
                                        {catName ? <span className="text-[#111111] text-2xl">{breadcrumbsData?.name}</span> :
                                            <div className="h-8 w-[100px] bg-gray-200 dark:bg-slate-600 rounded"></div>
                                        }
                                        {catName && (<span className="bg-[#e4e4e4] p-1 py-1 ml-2">
                                            {products.length}
                                        </span>)}
                                    </h2>

                                    <SortAndViewToggle data={data} handleSortByFilter={handleSortByFilter} setGridView={setGridView} />
                                </div>


                                <FilterTags />

                                <InfiniteScroll
                                    dataLength={products.length}
                                    next={fetchMoreData}
                                    hasMore={products.length < data?.total_count}
                                    scrollThreshold={0.8}
                                    scrollableTarget="scrollableDiv"
                                    scrollToTop={false} // Prevents scrolling to the top
                                >
                                    <div className={`${fetchData ? "grid-cols-4" : gridView} gap-[30px] md:grid hidden`}>
                                        {fetchData ? (
                                            [...Array(8)].map((_, index) => (
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div
                                                        key={index}
                                                        className="animate-pulse space-y-2 w-full p-4 border border-gray-300 rounded-md"
                                                    >
                                                        <div className="h-48 w-full bg-gray-200 w-full rounded"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : products.map((product, index) => (
                                            <CardTen product={product} key={index} gridView={gridView} />
                                        ))}
                                    </div>
                                    <div className="block md:hidden">
                                        <div className="flex md:hidden justify-between items-center mb-4 ">
                                            <select className={filterClass} onChange={(e) => handleSortByFilter(e.target.value)} aria-label="Sort by price or name">
                                                <option value=""> Sort Filter </option>
                                                {data?.sort_fields?.options.map((option) => (
                                                    <>
                                                        <option key={`${option.value}_ASC`} value={`${option.value}_ASC`}>
                                                            {option.label} , {option.value == 'price' ? "low to high" : 'A-Z'}
                                                        </option>
                                                        <option key={`${option.value}_DESC`} value={`${option.value}_DESC`}>
                                                            {option.label} , {option.value == 'price' ? "high to low" : 'A-Z'}
                                                        </option>
                                                    </>
                                                ))}
                                            </select>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="icon" aria-level="mobilegrid" onClick={() => setGridViewMobile('grid-cols-2')}>
                                                    <LayoutGrid size={20} />
                                                </Button>
                                                <Button variant="outline" size="icon" aria-level="mobilegrid" onClick={() => setGridViewMobile('grid-cols-1')}>
                                                    <LayoutList size={20} />
                                                </Button>
                                                <Button variant="outline" className="text-white bg-black" onClick={() => openMobileFilter(true)}>
                                                    {/* <Filter size={20} className="mr-2" /> */}
                                                    Sort Filter
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={`${gridViewMobile} gap-4 grid md:hidden`}>
                                            {products.map((product) => (
                                                <MobileProductsLayout product={product} />
                                            ))}
                                        </div>
                                    </div>
                                </InfiniteScroll>
                            </div>
                        ) : (<div className="w-full">
                            <h3 className="text-center text-xl font-bold">No Product Found </h3>

                        </div>)}

                    </div>
                </div>
                {/* {renderHtmlDynamic(categoryPageData?.bottomContent)} */}
            </>
        </>
    );
}