"use client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist } from "@/lib/redux/slices/wishlistSlice";
import { WishlistSvg } from "@/components/SvgFiles/SvgFile";

export default function HoverAddToWishlistV4({ products }) {
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
      className="p-3 bg-white hover:bg-gray-100 cursor-pointer"
      onClick={() => addWishlist()}
    >
      <WishlistSvg/>
    </div>
  );
}
