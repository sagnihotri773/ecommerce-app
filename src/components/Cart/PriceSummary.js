"use client";
import { useParams, useRouter } from "next/navigation";
import { redirectToCart } from "@/components/Util/commonFunctions";
import { useTranslations } from "next-intl";
import { checkOutUrl } from "@/components/RouteManager";
import { useDispatch, useSelector } from "react-redux";
import { removeCouponFromCart } from "@/lib/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AnimationLayout from "../Checkout/Main3Components/AnimationLayout";
import Coupon from "../Checkout/Main3Components/Coupon";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export const PriceSummary = () => {
  const t = useTranslations("ShoppingCart");
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);
  const [showCouponField, setShowCouponField] = useState(false);

  useEffect(() => {
    if (cart && cart.itemsV2?.items) {
      setProducts(cart.itemsV2?.items);
      setTotalPrice(cart.prices);
    }
  }, [cart]);


  const removeCoupon = async () => {
    setLoading(true);
    try {
      await dispatch(removeCouponFromCart({ cart_id: cartId }));
    } catch (error) {
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
      {products.length > 0 && (
        <>
          <div className="lg:col-span-8 md:order-1 order-3"></div>
          <div className="lg:col-span-4 md:order-2 order-1">
            <div className="p-2 rounded-md shadow dark:shadow-gray-800">
              <ul className="list-none">
                <li className="flex justify-between p-4">
                  <span className="font-semibold text-lg">{t("Subtotal")}</span>
                  <span className="text-slate-400">
                    <Price amount={totalPrice?.grand_total?.value} />
                  </span>
                </li>
                {totalPrice.applied_taxes.map((tax, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-4 border-t border-gray-100 dark:border-gray-800"
                  >
                    <span className="font-semibold text-lg">{t("Taxes")}</span>
                    <span className="text-slate-400">
                       
                      {tax.amount.currency} {tax.amount.value} 
                    </span>
                  </li>
                ))}

                {totalPrice?.discounts?.map((discount) => (
                  <>
                    <li className="flex justify-between p-4">
                      <span className="text-lg text-green-600">
                        {discount?.label}
                      </span>

                      <p className="text-red-600 font-semibold">
                        -
                        <Price amount={discount?.amount?.value} />
                      </p>
                    </li>
                    {discount?.label !== "Discount" && (
                      <li className="flex justify-between p-4">
                        <button
                          className="text-red-500 dark:text-red-500 hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                          aria-label="Close"
                          onClick={(e) => removeCoupon()}
                        >
                          {t(!loading ? "RemoveCoupon" : "RemovingCoupon")}
                        </button>
                      </li>
                    )}
                  </>
                ))}

                <li className="flex justify-between font-semibold p-4 border-t border-gray-200 dark:border-gray-600">
                  <span className="font-semibold text-lg">{t("Total")}</span>
                  <span className="font-semibold">
                    <Price amount={totalPrice?.grand_total?.value} />
                  </span>
                </li>
              </ul>
              <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                        {t('CouponDiscount')} 
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]" onClick={(e) => setShowCouponField(!showCouponField)}>
                            <a
                                href="javascript:void(0)"
                                className="apply drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#ff0000]"
                            >
                                {t('ApplyCoupon')} 
                            </a>
                        </span>
                    </li>
                    <AnimationLayout open={showCouponField} className={' '}>
                        <li className="flex justify-between leading-[28px]">
                            <div className="coupon-down-box w-full" style={{ display: showCouponField ? "block" : "none" }} >
                                <Coupon />
                            </div>
                        </li>
                    </AnimationLayout>
            </div>

            <button
              className="py-2 px-5 w-full inline-block font-semibold tracking-wide align-middle text-base text-center bg-primary text-white rounded-md mt-2"
              onClick={(e) => redirectToCart(checkOutUrl, router, params)}
            >
              {t("ProceedToCheckOut")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
