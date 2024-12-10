"use client";
import { useTranslations } from "next-intl";
import { checkOutUrl } from "@/components/RouteManager/index";
import { useDispatch, useSelector } from "react-redux";
import { removeCouponFromCart } from "@/lib/redux/slices/cartSlice";
import dynamic from 'next/dynamic'
const Coupon = dynamic(() => import('./coupon'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function CartSummary() {
  const t = useTranslations("Checkout")
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);

  const dispatch = useDispatch()

  const removeCoupon = () => {
    dispatch(removeCouponFromCart({ cart_id: cartId }))
  };

  const TYPE = {
    CONFIGURABLE: 'ConfigurableCartItem',
    BUNDLECARTITEM: "BundleCartItem"
  }

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800">
      <div className="flex justify-between items-center">
        <h5 className="text-lg font-semibold">{t("YourCart")}</h5>
        <a
          className="bg-primary flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5"
          href={checkOutUrl}
        >
          {cart?.total_quantity || 0}
        </a>
      </div>

      <div className="mt-4 rounded-md shadow dark:shadow-gray-800">
        {cart?.itemsV2?.items?.map((val, index) => (
          <>
            <div className="p-3 flex justify-between items-center" key={index}>
              <div>
                <h5 className="font-semibold"> {val?.product?.name} </h5>
                <p className="text-sm text-slate-400">
                  {" "}
                  <Price
                    amount={val?.prices?.price?.value || val?.product?.price_range?.minimum_price?.final_price?.value}
                  />{" "}
                  x {val?.quantity}{" "}
                </p>
              </div>

              <p className="text-slate-400 font-semibold">
                {" "}
                
                <Price
                  amount={val?.prices?.price?.value || val.product.price_range.minimum_price?.final_price?.value * val?.quantity}
                />{" "}
              </p>

            </div>
            <div className="pl-3">
              <ul className="list-none">
                {val?.__typename === TYPE.CONFIGURABLE ? val?.configurable_options?.map((config, i) => (
                  <li>{config.option_label}: {config.value_label}</li>
                )) : val?.__typename === TYPE.BUNDLECARTITEM ? val?.bundle_options?.map((bundle, i) => (
                  <>
                    <span className="font-bold">{bundle.label}:</span>
                    {bundle?.values?.map((val, index) => (
                      <li> {val.label} - <span> <Price amount={val?.price} /> {index < bundle?.values.length - 1 && ', '}  </span> </li>
                    ))}

                  </>
                )) : ''}

                {/* item?.__typename === TYPE.BUNDLECARTITEM ? item?.bundle_options.map((bundle, i) => (
                            <>
                              <li>
                                <span className="font-bold">{bundle.label}:</span>
                                {bundle?.values?.map((val, index, i) => (
                                  <> {val?.quantity}x {val.label} - <span> <Price amount={val?.price} /> </span>  {index < bundle.values.length - 1 && ', '} </>
                                ))}
                              </li>
                            </>
                          )) : ''
                           */}
              </ul>
            </div>
          </>
        ))}

        {cart?.prices?.discounts?.map((discount, index) => (
          <div key={index}>
            <div
              className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 text-green-600"
              key={index}
            >
              <div>
                <h5 className="font-semibold">{t("PromoCode")}</h5>
                <p className="text-sm text-green-600">{discount.label}</p>
              </div>
              <p className="text-red-600 font-semibold">
                -<Price amount={discount?.amount?.value} />
              </p>
            </div>
            {discount?.label !== "Discount" &&
              <button
                className="p-3 text-red-500 dark:text-red-500 hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                aria-label="Close"
                onClick={(e) => removeCoupon()}
              >
                {t("RemoveCoupon")}
              </button>}
          </div>
        ))}

        <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
          <div>
            <h5 className="font-semibold">{t("Total")} </h5>
          </div>
          <p className="font-semibold">
            {" "}
            <Price amount={cart?.prices?.grand_total?.value} />{" "}
          </p>
        </div>
      </div>
      <Coupon />
    </div>
  );
}
