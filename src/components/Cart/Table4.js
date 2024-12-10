"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ConfigOption } from "./Common";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const QuantityUpdate = dynamic(() => import('@/components/Cart/QuantityUpdate'), { ssr: false });
const ActionButton = dynamic(() => import('@/components/Cart/ActionButton'), { ssr: false });
const Summary2 = dynamic(() => import('@/components/Cart/Summary2'), { ssr: false });
import { clearCustomerCart } from "@/lib/redux/slices/cartSlice";

export default function Table4() {
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
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">{t('YourShoppingCart')}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left min-w-64 w-auto md:min-w-0"> {t("Product")}   </th>
                  <th className="p-4 text-left"> {t("Qty")}       </th>
                  <th className="p-4 text-left"> {t("Price")}     </th>
                  <th className="p-4 text-left"> {t("Action")}    </th>
                  <th className="p-4 text-left"> {t("Total")}     </th>
                </tr>
              </thead>
              <tbody>
                {cart?.itemsV2?.items?.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={product?.product?.image?.url}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <ConfigOption product={product} />
                      </div>

                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <QuantityUpdate val={product} setQuantities={setQuantities} quantities={quantities} />
                      </div>
                    </td>
                    <td className="p-4"><Price amount={getPrice(product, "price")} /></td>
                    <td className="p-4">
                      <ActionButton val={product} />
                    </td>
                    <td className="p-4"><Price amount={getPrice(product, "total")} /></td>
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
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('Summary')}</h2>
            <Summary2 />
          </div>
        </div>
      </div>
    </div>

  )
}