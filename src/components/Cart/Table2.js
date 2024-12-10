"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCustomerCart } from "@/lib/redux/slices/cartSlice";
import dynamic from "next/dynamic";
import { ConfigOption } from "./Common";
import { CLEAR_CUSTOMER_CART } from "@/lib/graphql/queries/shoppingCart";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const QuantityUpdate = dynamic(() => import('@/components/Cart/QuantityUpdate'), { ssr: false });
const ActionButton = dynamic(() => import('@/components/Cart/ActionButton'), { ssr: false });
const Summary2 = dynamic(() => import('@/components/Cart/Summary2'), { ssr: false });

export default function Table2() {
  const t = useTranslations("ShoppingCart");
  const { cart_id: cartId, cart, loading: cartLoading, clearCartLoading } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

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

  return (
    <main className='flex w-full flex-1 flex-col md:px-4 pb-6 pt-6 px-4 lg:px-0 overflow-auto'>
      <div className='min-h-screen-dvh xl:grid xl:grid-cols-12 xl:gap-x-8'>
        <div className='w-full xl:col-span-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b hover:bg-muted/50">
                  <th className="h-10 px-2 text-left font-medium hidden w-24 sm:table-cell">
                    <span className="sr-only"> {t("Image")} </span>
                  </th>
                  <th className="h-10 px-2 text-left font-medium w-1/6 min-w-32"> {t("Product")}</th>
                  <th className="h-10 px-2 text-left font-medium w-1/6 min-w-32">{t("Price")}</th>
                  <th className="h-10 px-2 text-left font-medium w-1/6 min-w-32"> {t("Qty")}</th>
                  <th className="h-10 px-2 text-left font-medium min-w-7"> {t("Action")} </th>
                  <th className="h-10 px-2 font-medium w-1/6 min-w-32 text-right">{t("Total")}</th>
                </tr> 
              </thead>
              <tbody>
                {cart?.itemsV2?.items?.map((val, i) => (
                  <tr className="border-b hover:bg-muted/50" key={i}>
                    <td className="p-2 hidden sm:table-cell sm:w-24">
                      <Image
                        src={val?.product?.image?.url}
                        className="aspect-square rounded-md object-cover"
                        alt=""
                        height={96}
                        width={96}
                      />
                    </td>
                    <td className="p-2 font-medium">
                      <ConfigOption product={val} />
                    </td>
                    <td className="p-2"> <Price amount={getPrice(val, "price")} /></td>
                    <td className="p-2">
                      <QuantityUpdate val={val} setQuantities={setQuantities} quantities={quantities} />
                    </td>
                    <td>
                    <ActionButton val={val}/>
                    </td>
                    <td className="p-2 text-right"><Price amount={getPrice(val, "total")} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-2 flex justify-end gap-5">
          <button
            onClick={() => dispatch(clearCustomerCart({ cart_id: cartId }))}
            className="bg-[#f2f2f2] rounded-full text-gray-800 inline-block cursor-pointer text-sm font-medium leading-none py-4 px-16 uppercase hover:bg-primary"
            type="button"
            disabled={clearCartLoading}
          >
             {t(!clearCartLoading ? "ClearShoppingCart" : "Processing")}
          </button>
        </div>
        </div>

        <div className='bg-gray-50 p-8 max-w-[65ch] xl:col-span-5'>
          <h2 className="text-2xl font-semibold mb-4">{t('Summary')}</h2>
          <Summary2 />
        </div>
      </div>
    </main>
  )
}