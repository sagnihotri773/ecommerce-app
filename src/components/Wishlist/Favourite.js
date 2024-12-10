"use client"
import Image from "next/image";
import { DeleteSvg } from "@/components/SvgFiles/SvgFile";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromWishlist, deleteWishlist } from "@/lib/redux/slices/wishlistSlice";
import { useRouter } from "next/navigation";
import { addWishlistToCart, truncateTitle } from "../Util/commonFunctions";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function Favourite() {
  const dispatch = useDispatch();

  const wishListData = useSelector((state) => state?.wishlist);

  const t = useTranslations("WishList");

  const removeItemFromWishlist = (wishlistItemsIds) => {
    dispatch(removeItemsFromWishlist({ wishlistItemsIds }));
  };

  const router = useRouter();

  return (
    <>
      <h5 className="text-lg font-semibold my-6">{t("FavouriteItem")}</h5>
      <div className="rounded-md shadow dark:shadow-gray-800 p-6 py-0">
        <ul>
          {wishListData?.wishlist?.wishlist?.items?.length > 0 ? (
            wishListData.wishlist?.wishlist?.items.map((item) => (
              <li
                key={item?.id}
                className="flex justify-between items-center py-6 border-t first-of-type:border-0 border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <Image
                    width={50}
                    height={50}
                    src={item?.product?.image?.url}
                    className="rounded shadow dark:shadow-gray-800 w-16"
                    alt={item?.product?.name || "Product Image"}
                  />
                  <div className="ml-4">
                    <span className="font-semibold hover:text-primary block">
                      {truncateTitle(item?.product?.name)}
                    </span>
                    <p className="text-green-600 text-sm mt-1">
                      <Price
                        amount={
                          item?.product?.price?.regularPrice?.amount?.value
                        }
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className="cursor-pointer inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full p-2"
                    onClick={() => removeItemFromWishlist(item?.id)}
                  >
                    <DeleteSvg />
                  </div>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => addWishlistToCart(item, router, dispatch)}
                  >
                    {t("AddToCart")}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="text-center py-8">
              <li>{t("EmptyWishList")}</li>
            </div>
          )}
        </ul>
        {wishListData?.wishlist?.wishlist?.items?.length > 0 ?
          <div className="py-8 flex justify-end">
            <div
              onClick={() => dispatch(deleteWishlist())}
              className="bg-[#f2f2f2] rounded-full text-gray-800 inline-block cursor-pointer text-sm font-medium leading-none py-4 px-16 uppercase hover:bg-primary"
            >
              Clear Wishlist
            </div>
          </div>
          : ''}
      </div>
    </>
  );
}
