"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ConfigOption } from "./Common";
import { clearCustomerCart } from "@/lib/redux/slices/cartSlice";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const QuantityUpdate = dynamic(() => import('@/components/Cart/QuantityUpdate'), { ssr: false });
const ActionButton = dynamic(() => import('@/components/Cart/ActionButton'), { ssr: false });
const Summary2 = dynamic(() => import('@/components/Cart/Summary2'), { ssr: false });

export default function Table3() {
  const t = useTranslations("ShoppingCart");
  const { cart_id: cartId, cart, clearCartLoading } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const initialQuantities = cart?.itemsV2?.items.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const getPrice = (val, value) => {
    let priceAmount = val?.product?.price_range?.minimum_price?.final_price?.value || val?.product?.price?.regularPrice?.amount?.value;
    if (val?.bundle_options) {
      priceAmount = val?.prices?.price?.value;
    }

    if (value === "price") {
      return priceAmount;
    } else if (value === "total") {
      return priceAmount * (quantities[val.id] || val?.quantity);
    }
  };

  useEffect(() => {
    if (cart && cart.itemsV2?.items) {
      setTotalPrice(cart.prices);
    }
  }, [cart]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t('Summary')}</h2>
          <Summary2 />
        </div>
        <div className='w-full lg:w-2/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="hidden sm:table-header-group">
                <tr className="border-b hover:bg-muted/50">
                  <th className="h-10 px-2 text-left font-medium w-24">
                    <span className="sr-only">{t("Image")}</span>
                  </th>
                  <th className="px-4 h-10">{t("Product")}</th>
                  <th className="px-4 h-10">{t("Price")}</th>
                  <th className="px-4 h-10">{t("Qty")}</th>
                  <th className="px-4 h-10">{t("Action")}</th>
                  <th className="px-4 h-10">{t("Total")}</th>
                </tr>
              </thead>
              <tbody>
                {cart?.itemsV2?.items?.map((val, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50 flex flex-col sm:table-row">
                    <td className="p-2 font-medium">
                      <Image
                        src={val?.product?.image?.url}
                        className="aspect-square rounded-md object-cover w-full sm:w-24 h-auto"
                        alt=""
                        height={96}
                        width={96}
                      />
                    </td>
                    <td className="p-2 font-medium">
                      <ConfigOption product={val} />
                    </td>
                    <td className="p-2">
                      <span className="sm:hidden font-medium mr-2">{t("Price")}:</span>
                      <Price amount={getPrice(val, "price")} />
                    </td>
                    <td className="p-2">
                      <span className="sm:hidden font-medium mr-2">{t("Qty")}:</span>
                      <QuantityUpdate val={val} setQuantities={setQuantities} quantities={quantities} />
                    </td>
                    <td className="p-2">
                      <span className="sm:hidden font-medium mr-2">{t("Action")}:</span>
                      <ActionButton val={val} />
                    </td>
                    <td className="p-2 text-right">
                      <span className="sm:hidden font-medium mr-2">{t("Total")}:</span>
                      <Price amount={getPrice(val, "total")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 px-4 sm:px-6 flex justify-end">
            <button
              onClick={() => dispatch(clearCustomerCart({ cart_id: cartId }))}
              className="bg-[#f2f2f2] rounded-full text-gray-800 inline-block cursor-pointer text-sm font-medium leading-none py-3 px-6 sm:py-4 sm:px-16 uppercase hover:bg-primary w-full sm:w-auto"
              type="button"
              disabled={clearCartLoading}
            >
              {t(!clearCartLoading ? "ClearShoppingCart" : "Processing")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

