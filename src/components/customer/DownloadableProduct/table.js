"use client"
import React from 'react'
import { useTranslations } from 'next-intl';
import { getStatusColor } from "@/components/Util/commonFunctions";

const STATUS = {
    AVAILABLE: "available"
}

export default function table({ orders, orderTableHeaders, handleDownload }) {

    const t = useTranslations("Order");

    return (
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
                {orders?.map((item) => {
                    const date = new Date(item?.date);
                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };
                    const formattedDate = date.toLocaleDateString("en-US", options);
                    return (
                        <tr className="bg-white dark:bg-slate-900 text-start" key={item?.id}  >
                            <th className="px-2 py-3 text-start" scope="row">
                                {item?.order_increment_id}
                            </th>
                            <td className="px-2 py-3 text-start">{formattedDate}</td>
                            <th className="px-2 py-3 text-start" scope="row">
                                {STATUS.AVAILABLE === item?.status && (
                                    <a
                                        href={item.download_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleDownload}
                                    >
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm12-6a1 1 0 1 0-2 0v6.586l-2.293-2.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L13 12.586V6ZM7 18a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
                                                    fill="#000000"
                                                ></path>
                                            </g>
                                        </svg>
                                    </a>
                                )}
                            </th>

                            <td className={`px-2 py-3 text-start ${getStatusColor(item?.status)}`} >
                                {item?.status}
                            </td>
                            <td className="px-2 py-3 text-start">
                                {item.remaining_downloads}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
