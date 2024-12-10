"use client";
import React, { useEffect, useState } from "react";
// import Breadcrumbs from "@/components/Blog/index";
import { useSelector } from "react-redux";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import CrossSells from "@/components/Cart/CrossSells";
import { renderHtmlDynamic } from "@/components/Util/commonFunctions";

import dynamic from 'next/dynamic'
const ShopCartOne = dynamic(() => import('@/components/Cart/Table'), { ssr: false });
const ShopCartTwo = dynamic(() => import('@/components/Cart/Table2'), { ssr: false });
const ShopCartThree = dynamic(() => import('@/components/Cart/Table3'), { ssr: false });
const ShopCartFour = dynamic(() => import('@/components/Cart/Table4'), { ssr: false });
const Breadcrumbs = dynamic(() => import('@/components/Common/BreadCrumbs/index'), { ssr: false });

const shopCartComponents = {
  ShopCartOne,
  ShopCartTwo,
  ShopCartThree,
  ShopCartFour,
};

const breadcrumbs = {
  title: "Fashion",
  pageUrl: "/",
  pageName: "SHOPCART",
};

export default function Main() {
  const [products, setProducts] = useState([]);
  const { cart_id: cartId, cart, loading } = useSelector((state) => state.customer);
  const [shopCartLayout, setShopCartLayout] = useState('');

  const [shopCartData, setShopCartData] = useState({});
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setShopCartData(storeConfigData?.availableStores[0]?.staticContent?.cartPage);
      setShopCartLayout(storeConfigData?.availableStores[0]?.layoutSetting?.shop_cart);
    }
  }, [storeConfigData?.availableStores])

  useEffect(() => {
    if (cart && cart.itemsV2?.items) {
      setProducts(cart.itemsV2?.items);
    }
  }, [cart]);

  const SelectedDrawer =  shopCartComponents[shopCartLayout] || ShopCartOne;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="relative ">
        {/* {renderHtmlDynamic(shopCartData?.topContent)} */}
        <div className="container m-auto relative">
          {products.length > 0 ? <SelectedDrawer /> : !loading && <EmptyCart />}
        </div>
        <CrossSells />
        {/* {renderHtmlDynamic(shopCartData?.bottomContent)} */}
      </section>
    </>
  );
}
