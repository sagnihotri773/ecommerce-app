import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PriceSummary } from "./PriceSummary";
import { ConfigOption } from "./Common";
import dynamic from "next/dynamic";
import { clearCustomerCart } from "@/lib/redux/slices/cartSlice";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const QuantityUpdate = dynamic(() => import('@/components/Cart/QuantityUpdate'), { ssr: false });
const ActionButton = dynamic(() => import('@/components/Cart/ActionButton'), { ssr: false });

export default function Table() {
  const t = useTranslations("ShoppingCart");
  const { cart_id: cartId, cart, clearCartLoading } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});
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

  return (
    <div className="grid lg:grid-cols-1">
      <main className='flex w-full flex-1 flex-col md:px-4 pb-6 pt-6 px-4 lg:px-0 overflow-auto'>
        <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">

          <table className="w-full text-start">
            <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="text-start p-4 min-w-[220px]" >  {t("Product")} </th>
                <th scope="col" className="p-4 w-24 min-w-[100px]">
                  {t("Price")}
                </th>
                <th scope="col" className="p-4 w-56 min-w-[220px]">
                  {t("Qty")}
                </th>
                <th className="col"> {t("Action")} </th>
                <th scope="col" className="p-4 w-24 min-w-[100px]">
                  {t("Total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.itemsV2?.items?.map((val, i) => (
                <tr
                  className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800"
                  key={i}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <Image
                        src={val?.product?.image?.url}
                        className="rounded shadow dark:shadow-gray-800 w-12"
                        alt=""
                        height={250}
                        width={250}
                      />
                      <div className="p-4">
                        <ConfigOption product={val} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Price amount={getPrice(val, "price")} />
                  </td>
                  <td className="p-4 text-center">
                    <QuantityUpdate val={val} setQuantities={setQuantities} quantities={quantities} />
                  </td>
                  <td className="p-4">
                    <ActionButton val={val} />
                  </td>
                  <td className="p-4 text-end">
                    <Price amount={getPrice(val, "total")} />
                  </td>
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
        <PriceSummary />
      </main>
    </div>
  );
};

