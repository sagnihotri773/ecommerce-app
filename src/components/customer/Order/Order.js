"use client"
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { getStatusColor } from "@/components/Util/commonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import { viewOrderUrl } from "../../RouteManager";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const Pagination = dynamic(() => import('@/components/Common/Pagination'), { ssr: false });

export default function Order() {
  const t = useTranslations("Order");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: customerOrder } = useSelector((state) => state.customerData);

  useEffect(() => {
    const page = parseInt(currentPage)
    dispatch(fetchCustomerData(page));
  }, [dispatch, currentPage]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(customerOrder?.customer?.orders);
  }, [customerOrder]);

  const totalPages = Math.ceil(
    orders?.total_count / orders?.page_info?.page_size
  );
  const orderTableHeaders = ['OrderNo', "Date", "Status", "Total", "Action"]

  return (
    <>
      {orders?.items?.length > 0 ? (
        <>
          <h5 className="text-lg font-semibold mb-6">{t("MyOrders")}</h5>
          <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
            <table className="w-full text-start text-slate-500 dark:text-slate-400">
              <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                <tr className="text-start">
                  {orderTableHeaders?.map((item) => (
                    <th
                      scope="col"
                      className="px-2 py-3 text-start"
                      style={{ minWidth: 104 }}
                    >
                      {t(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders?.items?.map((item) => {
                  const date = new Date(item?.order_date);

                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const formattedDate = date.toLocaleDateString("en-US", options);
                  return (
                    <tr
                      className="bg-white dark:bg-slate-900 text-start"
                      key={item?.id}
                    >
                      <th className="px-2 py-3 text-start" scope="row">
                        {item?.increment_id}
                      </th>
                      <td className="px-2 py-3 text-start">{formattedDate}</td>
                      <td
                        className={`px-2 py-3 text-start ${getStatusColor(
                          item?.status
                        )}`}
                      >
                        {item?.status}
                      </td>
                      <td className="px-2 py-3 text-start">
                        <Price amount={item?.grand_total} />
                      </td>
                      <td className="px-2 py-3 text-start">
                        <Link
                          className="text-primary"
                          prefetch={true}
                          href={`${viewOrderUrl}/${item?.increment_id}`}
                        >
                          {t("View")} <i className="mdi mdi-chevron-right" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white ">
        <p className="text-gray-600 text-lg font-medium">
          {t("NoOrder")}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {t("ExploreProducts")}
        </p>
      </div>
      }

      {orders?.total_count > 4 ? (
        <Pagination
          currentPage={orders?.page_info?.current_page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        ""
      )}
    </>
  );
}
