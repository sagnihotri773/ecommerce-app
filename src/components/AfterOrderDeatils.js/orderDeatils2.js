"use client";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { GET_CUSTOMER_ORDER_BY_ID } from "@/lib/graphql/queries/customer";
import { useEffect, useState } from "react";
import { formatDate } from "@/components/Util/commonFunctions";
import { useTranslations } from "next-intl";
import { ArrowRight, CreditCard, MapPin, Star } from "lucide-react";
import { homeUrl, shopUrl } from "../RouteManager";
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function orderDeatils1({ guestOrderData = {} }) {
    let authToken = localStorage.getItem("token")
    const params = useParams();
    const [shippingAddress, setShippingAddress] = useState();
    const [billingAddress, setBillingAddress] = useState();
    const [customerOrderData, setCustomerOrderData] = useState();
    const router = useRouter()
    const orderId = params?.id;
    const { data: customerOrder } = useQuery(GET_CUSTOMER_ORDER_BY_ID, {
        variables: {
            orderId: orderId,
        },
    });

    useEffect(() => {
        if (customerOrder || guestOrderData) {
            setShippingAddress(
                customerOrder?.customer?.orders?.items?.[0]?.shipping_address ||
                guestOrderData?.guestOrder?.shipping_address
            );
            setBillingAddress(
                customerOrder?.customer?.orders?.items?.[0]?.billing_address ||
                guestOrderData?.guestOrder?.billing_address
            );
        }
        if (authToken) {
            setCustomerOrderData(customerOrder?.customer?.orders?.items[0]);
        } else {
            setCustomerOrderData(guestOrderData?.guestOrder);
        }
    }, [customerOrder, guestOrderData]);


    const t = useTranslations("viewOrder")

    return (
        <>
        {/* <div className="absolute inset-0 h-[250px] bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div> */}
        <div className="py-12 bg-gradient-to-br  flex items-center justify-center px-4 md:px-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                            <h1 className="text-2xl font-bold mb-6">
                               {t("OrderDetails")}
                            </h1>
                        </div>
                        <table className="w-full">
                            <tbody>
                                {[{ label: 'Order No.', value: `#${orderId || guestOrderData?.guestOrder?.number}` },
                                { label: 'Order Status', value: customerOrderData?.status },
                                { label: 'Payment Method:', value: customerOrderData?.shipping_method },
                                { label: 'Date:', value: formatDate(customerOrderData?.order_date) },
                                { label: 'Subtotal:', value: <Price amount={customerOrderData?.total?.subtotal?.value} /> },
                                { label: 'Discount:', value: <Price amount={customerOrderData?.total?.discounts[0]?.amount?.value} /> },
                                { label: 'Total', value: <Price amount={customerOrderData?.total?.grand_total?.value} /> },
                                ].map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                        <td className="py-3 text-sm font-medium text-gray-600">{item.label}</td>
                                        <td className="py-3 text-sm text-gray-900 text-right">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />  {t("ShippingAddress")}
                                </h3>
                                <address className="not-italic text-sm text-gray-600">
                                {shippingAddress?.firstname} {shippingAddress?.lastname}<br />
                                    {shippingAddress?.street?.map((val) => val)}<br />
                                    {shippingAddress?.region}, {shippingAddress?.city} <br/>
                                    {shippingAddress?.postcode} ,{shippingAddress?.country_code} <br /> 
                                </address>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" /> {t("BillingAddress")}
                                </h3>
                                <address className="not-italic text-sm text-gray-600">
                                    {billingAddress?.firstname} {billingAddress?.lastname}<br />
                                    {billingAddress?.street?.map((val) => val)}<br />
                                    {billingAddress?.region}, {billingAddress?.city} <br/>
                                    {billingAddress?.postcode} ,{billingAddress?.country_code} <br /> 
                                </address>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold mb-6"> {t('PurchasedProducts')} </h2>
                        <table className="w-full mb-6">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-sm font-medium text-gray-600">{t('Name')}</th>
                                    <th className="text-right py-3 text-sm font-medium text-gray-600">{t('Price')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerOrderData?.items?.length > 0 && customerOrderData?.items?.map((val, index) => (
                                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                        <td className="py-3 text-sm text-gray-900">{val.product_name}</td>
                                        <td className="py-3 text-sm text-gray-900 text-right"> <Price amount={val?.product_sale_price?.value} /> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <div className="flex items-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-2 text-2xl">👆</span>
                        </div> */}
                        <p className="text-sm text-gray-600 mb-6"> {t('DontForgotRating')} </p>
                        <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center hover:from-blue-500 hover:to-indigo-600 transition-colors" onClick={() =>  router.push(homeUrl)}>
                        {t('BackToHome')} 
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
