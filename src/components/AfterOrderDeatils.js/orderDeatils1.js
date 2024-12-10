"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_CUSTOMER_ORDER_BY_ID } from "@/lib/graphql/queries/customer";
import { useEffect, useState } from "react";
import { PdfSvg } from "@/components/SvgFiles/SvgFile";
import { AddressDetail } from "@/components/Common/Address/AddressDeatils";
import { OrderSummaryTable } from "@/components/customer/viewOrder/OrderSummaryTable";
import { formatDate } from "@/components/Util/commonFunctions";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function orderDeatils1({ guestOrderData = {} }) {
    let authToken = localStorage.getItem("token")
    const params = useParams();
    const [shippingAddress, setShippingAddress] = useState();
    const [billingAddress, setBillingAddress] = useState();
    const [customerOrderData, setCustomerOrderData] = useState();
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

    const OrderInvoiceHeader = ["InvoiceID", "Name", "Price", "IncrementID", "Action"]
    const ShipmentsHeader = ["ShipmentId", "Name", "Price", "IncrementID", "Tracking"]

    return (
        <div className="container m-auto ">
            <div className="max-w-4xl mx-auto py-36 p-4">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                    <h1 className="text-2xl mb-4 lg:mb-0">
                        {t("Order")} #{orderId || guestOrderData?.guestOrder?.number}
                    </h1>
                    <button className="px-4 py-2 rounded border border-[#cccccc]">
                        {customerOrderData?.status}
                    </button>
                </div>
                <div className="py-7">
                    <span>{formatDate(customerOrderData?.order_date)}</span>
                </div>

                {customerOrderData?.invoices?.length > 0 && (
                    <div>
                        <p>{t("OrderInvoice")}</p>
                        <table className="min-w-full border border-gray-300 mb-8">
                            <thead className="bg-gray-100">
                                <tr className="text-center">
                                    {OrderInvoiceHeader?.map((item) => (
                                        <th
                                            scope="col"
                                            className="px-2 py-3 border border-gray-300 text-center"
                                            style={{ minWidth: 104 }}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-gray-300">
                                    {customerOrderData?.invoices?.map((item) => {
                                        return (
                                            <>
                                                <td className="text-center">{item?.id}</td>
                                                <td className="text-center">
                                                    {customerOrder?.customer?.firstname}
                                                </td>
                                                <td className="text-center">
                                                    <Price amount={customerOrderData?.grand_total} />
                                                </td>
                                                <td className="text-center">
                                                    {customerOrderData?.increment_id}
                                                </td>
                                                <td className="text-center">
                                                    <div className="flex justify-center">
                                                        <a
                                                            href={item?.pdf_url}
                                                            download
                                                            target="_blank"
                                                            className="text-center"
                                                        >
                                                            <PdfSvg />
                                                        </a>
                                                    </div>
                                                </td>
                                            </>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {customerOrderData?.shipments?.length > 0 && (
                    <div>
                        <p>{t("OrderShipment")}</p>
                        <table className="min-w-full border border-gray-300 mb-8">
                            <thead className="bg-gray-100">
                                <tr className="text-center">
                                    {ShipmentsHeader?.map((item) => (
                                        <th
                                            scope="col"
                                            className="px-2 py-3 border border-gray-300 text-center"
                                            style={{ minWidth: 104 }}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-gray-300">
                                    {customerOrderData?.shipments?.map((item) => {
                                        return (
                                            <>
                                                <td className="text-center">{item?.id}</td>
                                                <td className="text-center">
                                                    {customerOrder?.customer?.firstname}
                                                </td>
                                                <td className="text-center">
                                                    <Price amount={customerOrderData?.grand_total} />
                                                </td>
                                                <td className="text-center">
                                                    {customerOrderData?.increment_id}
                                                </td>
                                                <td className="text-center">Tracking</td>
                                            </>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <OrderSummaryTable customerOrderData={customerOrderData} />
                <div>
                    <div className="border-b border-[#cccccc] mb-4">
                        <strong>{t("OrderInformation")}</strong>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3">
                        <div>
                            {shippingAddress && (
                                <AddressDetail
                                    data={shippingAddress}
                                    title={t("ShippingAddress")}
                                />
                            )}
                        </div>
                        <div>
                            <strong>{t("ShippingMethod")}</strong>
                            <div>{customerOrderData?.shipping_method}</div>
                        </div>
                        <div>
                            {billingAddress && (
                                <AddressDetail
                                    data={billingAddress}
                                    title={t("BillingAddress")}
                                />
                            )}
                        </div>
                        <div>
                            <strong>{t("PaymentMethod")}</strong>
                            <div>{customerOrderData?.payment_methods?.[0]?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
