"use client"
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Common/Pagination";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import Table from './table';
import { GET_DOWNLOADABLE_PRODUCTS } from "@/lib/graphql/queries/checkout";
import { useQuery } from "@apollo/client";

export default function DownloadableProduct() {
    const t = useTranslations("Order");
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const { loading, error, data, refetch } = useQuery(GET_DOWNLOADABLE_PRODUCTS, {
        variables: {},
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        const page = parseInt(currentPage)
        dispatch(fetchCustomerData(page));
    }, [dispatch, currentPage]);


    useEffect(() => {
        setOrders(data?.customerDownloadableProducts?.items);
    }, [data]);

    // const totalPages = Math.ceil(
    //     orders?.total_count / orders?.page_info?.page_size
    // );
    const orderTableHeaders = ['OrderNo', "Date", "Download", "Status", "RemainingDownloads"];

    const handleDownload = () => {
        refetch();
    };

    return (
        <>
            {orders?.length > 0 ? (
                <>
                    <h5 className="text-lg font-semibold mb-6">{t("MyDownloadableProducts")}</h5>
                    <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                        <Table orderTableHeaders={orderTableHeaders} orders={orders} handleDownload={handleDownload} />
                    </div>

                </>

            ) : <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white ">
                <p className="text-gray-600 text-lg font-medium">
                   {t("NoOrder")}
                </p>
            </div>
            }

            {/* {orders?.total_count > 4 ? (
                <Pagination
                    currentPage={orders?.page_info?.current_page}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            ) : (
                ""
            )} */}
        </>
    );
}
