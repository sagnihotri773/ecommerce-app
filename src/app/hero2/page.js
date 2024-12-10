"use client";
import React, { useEffect, useState } from "react";
import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import { useDispatch, useSelector } from "react-redux";
import { customerStatus } from "@/lib/redux/slices/cartSlice";
import { authToken } from "@/components/Util/commonFunctions";
import EndOfSession from "../../components/Hero2/EndOfSession";
import LoadingProductCards from "@/components/Product/LoadingProductCards";
// import ProductsCard from '@/components/Common/ProductCard/Cards'
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import('@/components/Common/ProductCard/ProductCardLayout'), { ssr: false });
const CustomerReviews = dynamic(() => import('@/components/Hero1/CustomerReviews'), { ssr: false });
const PopularItems = dynamic(() => import('@/components/Product/PopularItems'), { ssr: false });
const Banner = dynamic(() => import('@/components/Hero2/banner'), { ssr: false });


export default function Index() {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [urlRewrites, setUrlRewrites] = useState([]);
    const [search, setSearch] = useState("");
    const [productCardLayoutName , setProductCardLayoutName] = useState('');
    const dispatch = useDispatch();
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    useEffect(() => {
        const fetchDataCategoriesAsync = async () => {
            const result = await getDynamicData(GET_CATEGORY, { search });
            const res = result?.categoryList[0]?.children;
            setCategories(res);
        };

        fetchDataCategoriesAsync();
    }, []);

    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setProductCardLayoutName(storeConfigData?.availableStores[0]?.layoutSetting?.product_card);
        }
    }, [storeConfigData?.availableStores])
 

    useEffect(() => {
        dispatch(customerStatus());
    }, []);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const values = {
                search,
                filters: {},
                sort: "",
                pageSize: "8",
                currentPage: "1",
            };
            const result = await getDynamicData(GET_PRODUCTS, values);
            const allUrlRewrites = result?.products?.items?.flatMap(product =>
                product.upsell_products.map(rewrite => rewrite)
            );

            setUrlRewrites(allUrlRewrites)

            // Set only first 8 record
            setProducts(result?.products?.items?.slice(0, 8));
        };
        fetchDataAsync();

        if (!authToken) {
            localStorage.setItem("userType", "guest");
        } else {
            localStorage.setItem("userType", "customer");
        }
    }, []);


    return (
        <section className='className="relative md:pb-24 pb-16'>
            <Banner />
            <div className="container-fluid relative py-10 lg:mx-6 mx-3">
                <PopularItems productsList={products} />
            </div>
            <EndOfSession />

            <div className="container-fluid relative mb-10 lg:mx-6 mx-3">
                <div className="container m-auto relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 justify-center text-center mb-6">
                        <h5 className="font-semibold text-3xl leading-normal mb-4">
                            Best Seller Items
                        </h5>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Shop the latest products from the most popular collections
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        {urlRewrites?.length > 0 ? urlRewrites?.slice(0, 5)?.map((item, index) => (
                            <ProductCard key={index} layoutName={productCardLayoutName} products={item} />
                        )) : <LoadingProductCards />}
                    </div>
                </div>
            </div>
            <CustomerReviews />
        </section>
    );
}