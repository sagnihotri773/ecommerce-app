"use client";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { removeCouponFromCart } from "@/lib/redux/slices/cartSlice";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const Coupon = dynamic(() => import('@/components/Checkout/Main3Components/Coupon'), { ssr: false });
const AnimationLayout = dynamic(() => import('@/components/Checkout/Main3Components/AnimationLayout'), { ssr: false });

export default function CartSummary({ shippingMethod, shippingMethodValue }) {
    const t = useTranslations("Checkout")
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);
    const [showCouponField, setShowCouponField] = useState(false);
    const dispatch = useDispatch()

    const removeCoupon = () => {
        dispatch(removeCouponFromCart({ cart_id: cartId }))
    };

    return (
        <>
            <div className="sub-title mb-[12px]">
                <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    {t('Summary')}
                </h4>
            </div>
            <div className="checkout-summary mb-[20px] border-b-[1px] border-solid border-[#eee]">
                <ul className="mb-[20px]">
                    {cart?.prices?.discounts?.map((discount, index) => (
                        <>
                            <li className="flex justify-between leading-[28px] mb-[8px]" key={index}>
                                <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                                    <h5 className="font-semibold">{t("PromoCode")}</h5>
                                    <p className="text-sm text-green-600">{discount.label}</p>
                                </span>
                                <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                                    -<Price amount={discount?.amount?.value} />
                                    <p className="text-end">

                                        {discount?.label !== "Discount" &&
                                            <button
                                                className="text-red-500 dark:text-red-500 hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                                                aria-label="Close"
                                                onClick={(e) => removeCoupon()}
                                            >
                                                <Trash2 />
                                            </button>}
                                    </p>
                                </span>
                            </li>
                        </>
                    ))}

                    <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item bold leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                        {t('Total')} 
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                            <Price amount={cart?.prices?.grand_total?.value} />
                        </span>
                    </li>
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

                </ul>
            </div>
        </>
    );
}
