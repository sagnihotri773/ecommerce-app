"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { removeCouponFromCart } from '@/lib/redux/slices/cartSlice';
import { redirectToCart } from '../Util/commonFunctions';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import dynamic from "next/dynamic";
import { checkOutUrl } from '../RouteManager';
import AnimationLayout from '../Checkout/Main3Components/AnimationLayout';
import Coupon from '../Checkout/Main3Components/Coupon';
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function Summary2() {
    const t = useTranslations("ShoppingCart");
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState({});
    const [loading, setLoading] = useState(false);
    const [showCouponField, setShowCouponField] = useState(false);
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);

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
        <div className="space-y-4">
            <div className="flex justify-between pt-4">
                <span>{t("Subtotal")}</span>
                <span><Price amount={totalPrice?.grand_total?.value} /></span>
            </div>
            {totalPrice?.applied_taxes?.length > 0 &&
                <div className="flex justify-between">
                    {!totalPrice.applied_taxes.map((tax, index) => (
                        <span
                            key={index}>
                            <span >{t("Taxes")}</span>
                            <span ><Price amount={tax.amount.value} /></span>
                        </span>
                    ))}
                </div>}
            {totalPrice?.discounts?.length > 0 &&
                <div className="flex justify-between items-baseline">
                    {totalPrice?.discounts?.map((discount) => (
                        <>
                            <span> {discount?.label} </span>
                            <span >
                                <Price amount={discount?.amount?.value} />
                                {discount?.label !== "Discount" && (
                                    <button
                                        className="text-red-500 dark:text-red-500 hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                                        aria-label="Close"
                                        onClick={(e) => removeCoupon()}
                                    >
                                        <Trash2 size={20} className="mt-2" />
                                    </button>
                                )}
                            </span>
                        </>
                    ))}
                </div>}
            <div className="flex justify-between font-semibold text-lg">
                <span>{t("Total")}</span>
                <span> <Price amount={totalPrice?.grand_total?.value} /></span>
            </div>
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
            <Button className="w-full bg-primary hover:bg-primary-600 text-white" onClick={(e) => redirectToCart(checkOutUrl, router, params)}> {t("ProceedToCheckOut")}</Button>
        </div>
    )
}
