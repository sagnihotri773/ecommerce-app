"use client";

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicData } from '../commonGraphQuery';
import { ADD_PRODUCTS_TO_CART } from '@/lib/graphql/queries/shoppingCart';
import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { truncateTitle, UrlSuffix } from '../commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';

export default function HoverAddToCartButton({ products, className='' }) {
    const [addToCart, setAddToCart] = useState('');
    const { cart_id } = useSelector((state) => state.customer);
    const dispatch = useDispatch();
    const router = useRouter();
    const t = useTranslations("ProductCard")

    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
    const categoryUrlSuffix = UrlSuffix(storeConfigData?.availableStores);

    const handleAddToCart = async (products) => {
        setAddToCart(products.sku);
        dispatch(startLoading());
        const data = {
            cartId: cart_id,
            sku: products.sku,
            quantity: 1,
        };
        const createUserData = await createDynamicData(ADD_PRODUCTS_TO_CART, data);
        if (products.__typename !== "SimpleProduct") {
            return router.push(`/${products.url_key}${categoryUrlSuffix}`);
        }
        if (createUserData?.message) {
            localStorage.removeItem('cart_id');
            dispatch(initCart());
        } else if (createUserData) {
            dispatch(fetchCart(cart_id));
            dispatch(openDrawer({ type: "cart", title:" Your Shopping Cart" }));
            toast.success(truncateTitle(products.name) +" "+t("AddToCartSuccess"));
        } else if (!localStorage.getItem("cart_id")) {
            dispatch(initCart());
        }
        dispatch(stopLoading());
        setAddToCart('');
    };

    return (
        <button
            className={`py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md cursor-pointer ${className} `}
            disabled={addToCart}
            onClick={(e) => handleAddToCart(products)}
        >
            {addToCart ? "Loading..." : "Add to Cart"}
        </button>
    )
}
