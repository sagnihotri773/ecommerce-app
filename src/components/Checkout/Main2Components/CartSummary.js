"use client";
import { useTranslations } from "next-intl";
import { checkOutUrl } from "@/components/RouteManager/index";
import { useDispatch, useSelector } from "react-redux";
import { removeCouponFromCart } from "@/lib/redux/slices/cartSlice";
import { Link } from "@/components/ui/Link";
import dynamic from "next/dynamic";
const ShippingMethod = dynamic(() => import('@/components/Checkout/ShippingMethod'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function CartSummary({ shippingMethod, shippingMethodValue }) {
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
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">{t("YourCart")}</h2>
                <Link
                    className="bg-primary flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5"
                    href={checkOutUrl}
                    prefetch={true}
                >
                    {cart?.total_quantity || 0}
                </Link>
            </div>
            <div className="flex justify-between py-2 border-b">
                <span className="font-medium">{t('Product')}</span>
                <span className="font-medium">{t('Total')}</span>
            </div>
            {cart?.itemsV2?.items?.map((val, index) => (
                <div className="flex justify-between py-2 border-b" key={index}>
                    <span className="font-medium">
                        <div key={index}>
                            <h5 className="font-semibold"> {val?.product?.name} </h5>
                            <p className="text-sm text-slate-400">
                                <Price
                                    amount={val?.prices?.price?.value || val?.product?.price_range?.minimum_price?.final_price?.value}
                                />
                                x {val?.quantity}
                            </p>
                        </div>
                        <ul className="list-none">
                            {val?.__typename === TYPE.CONFIGURABLE ? val?.configurable_options?.map((config, i) => (
                                <li key={i}>{config.option_label}: {config.value_label}</li>
                            )) : val?.__typename === TYPE.BUNDLECARTITEM ? val?.bundle_options?.map((bundle, i) => (
                                <div key={i}>
                                    <span className="font-bold">{bundle.label}:</span>
                                    {bundle?.values?.map((val, index) => (
                                        <li key={index}> {val.label} - <span> <Price amount={val?.price} /> {index < bundle?.values.length - 1 && ', '}  </span> </li>
                                    ))}

                                </div>
                            )) : ''}
                        </ul>
                    </span>
                    <span className="font-medium">
                        <Price
                            amount={val?.prices?.price?.value || val.product.price_range.minimum_price?.final_price?.value * val?.quantity}
                        />
                    </span>

                </div>
            ))}
            {cart?.prices?.discounts?.map((discount, index) => (
                <div key={index}>
                    <div className="flex justify-between py-2 border-b" key={index}>
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
                            className="text-red-500 dark:text-red-500 hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                            aria-label="Close"
                            onClick={(e) => removeCoupon()}
                        >
                            {t("RemoveCoupon")}
                        </button>}
                </div>
            ))}

            <div className="flex justify-between py-2 border-b">
                <span className="text-[24px] font-bold">{t('ShippingMethod')}</span>
                <ShippingMethod shippingMethod={shippingMethod} shippingMethodValue={shippingMethodValue} titleShow={false} />
            </div>
            <div className="flex justify-between py-2 font-bold">
                <span>{t("OrderTotal")}</span>
                <span className="text-red-600"> <Price amount={cart?.prices?.grand_total?.value} /> </span>
            </div>
        </div>
    );
}
