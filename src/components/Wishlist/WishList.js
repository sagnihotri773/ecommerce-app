"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import WishListButton from "@/components/Util/Button/WishListButton";
import { addProductToWishlist } from "@/lib/redux/slices/wishlistSlice";
import WishListButtonV2 from "../Util/Button/WishlistButtonV2";
import WishListButtonV3 from "../Util/Button/WishListButtonV3";

export default function WishList({ quantity, data }) {
  const t = useTranslations("ProductCard");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: customerData } = useSelector((state) => state.customerData);
  const wishlistId = customerData?.customer?.wishlists[0].id;



  const handleAddToWishlist = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        addProductToWishlist({ wishlistId, sku: data?.sku, quantity })
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WishListButtonV3
      isLoading={isLoading}
      callback={(e) => handleAddToWishlist()}
    />
  );
}
