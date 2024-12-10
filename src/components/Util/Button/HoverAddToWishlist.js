'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { AddWishListSvg } from '@/components/SvgFiles/SvgFile';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWishlist } from '@/lib/redux/slices/wishlistSlice';

export default function HoverAddToWishlist({ products }) {
    const t = useTranslations("ProductCard");
    const dispatch = useDispatch();
    const { data: customerData } = useSelector((state) => state.customerData);
    const wishlistId = customerData?.customer?.wishlists[0].id;

    const addWishlist = () => {

        dispatch(addProductToWishlist({ wishlistId, sku: products?.sku, quantity: 1 }))

    };


    return (
        <div
            className="size-10 inline-flex cursor-pointer items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
            onClick={() => addWishlist()}
        >
            <AddWishListSvg />
        </div>
    )
}
