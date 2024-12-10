"use client"
import { useTranslations } from "next-intl";
import { DeleteSvg } from "@/components/SvgFiles/SvgFile";
import Image from "next/image";
import { removeItemFromCart } from "@/lib/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getQty, getStockStatus, truncateTitle } from "@/components/Util/commonFunctions";
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function ShoppingCart() {
  const t = useTranslations("ShoppingCart");

  const dispatch = useDispatch();

  const { cart_id: cartId, cart } = useSelector((state) => state.customer);

  const removeCartItem = (cart_item_id) => {
    dispatch(
      removeItemFromCart({
        cart_id: cartId,
        cart_item_id,
      })
    );
  };
  return (
    <>
      <h5 className="text-lg font-semibold my-6">{t("ShoppingCart")}</h5>
      <div className="rounded-md shadow dark:shadow-gray-800 p-6 py-0">
        <ul>
          {cart?.itemsV2?.items?.length > 0 ? (
            cart?.itemsV2?.items.map((item) => (
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
                    alt=""
                  />
                  <div className="ms-4">
                    <span className="font-semibold hover:text-primary">
                    {truncateTitle(item?.product?.name)}
                    </span>
                    <p className="text-green-600 text-sm mt-1">
                      <Price
                        amount={
                          item?.product?.price?.regularPrice?.amount?.value
                        }
                      />{" "}
                      {getQty(item)}
                    </p>
                    {getStockStatus(item?.product?.stock_status)}
                  </div>
                </div>
                <div onClick={() => removeCartItem(item?.id)}>
                  <div className="size-9 cursor-pointer inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full">
                    <DeleteSvg />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="text-center py-8">
              <li>{t("CartEmpty")}</li>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
