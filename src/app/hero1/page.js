"use client";
import React, { useEffect, useState } from "react";

import FeaturedCollections from "@/components/Hero1/FeaturedCollections";
import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import { useDispatch } from "react-redux";
import { customerStatus } from "@/lib/redux/slices/cartSlice";
import NewArrival from "@/components/Product/NewArrival";
import { authToken } from "@/components/Util/commonFunctions";
import Swiper from "@/components/Hero1/Swiper";
import EndOFSaleOutlet from "@/components/Hero1/EndOFSaleOutlet";
import PopularItems from "@/components/Product/PopularItems";
import CustomerReviews from "@/components/Hero1/CustomerReviews";

export default function Index() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
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
      <Swiper />
      <div className="container-fluid relative mb-10 lg:mx-6 py-16">
        <FeaturedCollections categories={categories} />
      </div>
      <NewArrival productsList={products} />
      <EndOFSaleOutlet />
      <div className="container-fluid relative mb-10 lg:mx-6 mx-3">
        <PopularItems productsList={products} />
      </div>
      <CustomerReviews />
    </section>
  );
}