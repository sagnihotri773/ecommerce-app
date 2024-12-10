"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromWishlist } from "@/lib/redux/slices/wishlistSlice";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  addWishlistToCart,
  getPrice,
  getPriceAmount,
  getQty,
  getStockStatus,
  truncateTitle,
} from "../Util/commonFunctions";
import Drawer from "../Common/DrawerLayout/Drawer";
import { Trash2, ShoppingCart } from 'lucide-react'

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function WishlistModel() { 
  const t = useTranslations("WishList");
  const router = useRouter()
  const wishListData = useSelector((state) => state?.wishlist);
  const dispatch = useDispatch();

  const handleRemoveWishListItem = (wishlistItemsIds) => {
    dispatch(removeItemsFromWishlist({ wishlistItemsIds }));
  };

  return (
    <>
      <Drawer>
        <div>
          {wishListData?.wishlist?.wishlist?.items?.length > 0 ? (
            <ul>
              {wishListData?.wishlist?.wishlist?.items.map((item) => (
                <li className="flex py-3" key={item?.id}>
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item?.product?.image?.url}
                      alt="Product image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3> {truncateTitle(item?.product?.name)} </h3>
                        <p className="ml-4">
                          <Price
                            amount={getPriceAmount(
                              item?.product?.price_range?.minimum_price?.final_price?.value || item?.product?.price_range?.minimum_price?.regularPrice?.amount?.value,
                              item?.quantity
                            )}
                          />
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 text-left">
                        <Price
                          amount={getPrice(item, "final_price") || getPrice(item, "regularPrice")}
                        />
                        {getQty(item)}
                      </p>
                      {getStockStatus(item?.product?.stock_status)}
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex">
                        <button
                          type="button"
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          onClick={() => handleRemoveWishListItem(item?.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => addWishlistToCart(item, router, dispatch)}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors">
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center w-[300px] items-center m-auto h-screen">
              <h4 className="text-black font-bold">{t("EmptyWishList")}</h4>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};
