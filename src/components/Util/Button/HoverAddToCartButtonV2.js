"use client";

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicData } from '../commonGraphQuery';
import { ADD_PRODUCTS_TO_CART } from '@/lib/graphql/queries/shoppingCart';
import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import "react-toastify/dist/ReactToastify.css";
import { truncateTitle, UrlSuffix } from '../commonFunctions';
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';

export default function HoverAddToCartButtonV2({ products, className='' }) {
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
            toast.success(truncateTitle(products.name) +" "+t("AddToCartSuccess"));
        } else if (!localStorage.getItem("cart_id")) {
            dispatch(initCart());
        }
        dispatch(stopLoading());
        setAddToCart('');
    };

    return (
        <button
            className={`bg-[#111111]  w-full hover:bg-[#b5876d] text-white flex items-center justify-center h-12 transition-all duration-500 `}
            disabled={addToCart}
            onClick={(e) => handleAddToCart(products)}
        >
            {addToCart ? "Sending..." : "Add to Cart"}
        </button>
    )
}
