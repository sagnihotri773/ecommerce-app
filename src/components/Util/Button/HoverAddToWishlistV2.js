"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AddWishListSvg } from "@/components/SvgFiles/SvgFile";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist } from "@/lib/redux/slices/wishlistSlice";

export default function HoverAddToWishlistV2({ products }) {
  const t = useTranslations("ProductCard");
  const dispatch = useDispatch();
  const { data: customerData } = useSelector((state) => state.customerData);
  const wishlistId = customerData?.customer?.wishlists[0].id;

  const addWishlist = () => {
    dispatch(
      addProductToWishlist({ wishlistId, sku: products?.sku, quantity: 1 })
    );
  };

  return (
    <div
      className="bg-primary hover:bg-black flex justify-center items-center w-[48px] border-r border-r-white text-white block text-lg h-12 leading-[48px] text-center capitalize"
      onClick={() => addWishlist()}
    >
      <AddWishListSvg />
    </div>
  );
}
