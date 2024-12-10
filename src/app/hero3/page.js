"use client";
import React, { useEffect, useState } from "react";
import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import { useDispatch } from "react-redux";
import { customerStatus } from "@/lib/redux/slices/cartSlice";
import { authToken } from "@/components/Util/commonFunctions";
import Banner from "@/components/Hero3/Banner";
import PopularItems from "@/components/Product/PopularItems";
import CustomerReviews from "@/components/Hero1/CustomerReviews";
import EndOfSession from "../../components/Hero2/EndOfSession";
import LoadingProductCards from "@/components/Product/LoadingProductCards";
import ProductsCard from '@/components/Common/ProductCard/Cards'
import Category from '@/components/Hero3/category';
import EndOFSaleOutlet from "@/components/Hero1/EndOFSaleOutlet";


export default function Index() {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [urlRewrites, setUrlRewrites] = useState([]);
    const [search, setSearch] = useState("");
    const targetDate = "2024-12-31T00:00:00";
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchDataCategoriesAsync = async () => {
            const result = await getDynamicData(GET_CATEGORY, { search });
            const res = result?.categoryList[0]?.children;
            setCategories(res);
        };

        fetchDataCategoriesAsync();
    }, []);

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
            <Category categories={categories} />
            <div className="container-fluid relative mt-6 lg:mx-6 mx-3">
                <PopularItems productsList={products} />
            </div>
            <EndOFSaleOutlet />

            <div className="container-fluid relative py-10 md:my-5 lg:mx-6 mx-3">
                <div className="grid grid-cols-1 justify-center text-center">
                    <h5 className="font-semibold text-3xl leading-normal mb-4">
                        Best Seller Items
                    </h5>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Shop the latest products from the most popular collections
                    </p>
                </div>
                <div className="container m-auto relative md:mt-20 mt-10">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        {urlRewrites?.length > 0 ? urlRewrites?.slice(0, 5)?.map((item, index) => (
                            <ProductsCard products={item} key={index} />
                        )) : <LoadingProductCards />}
                    </div>
                </div>
            </div>
            <CustomerReviews />
        </section>
    );
}