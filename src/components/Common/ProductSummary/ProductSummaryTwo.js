import { getStockStatus, ratingCountShow } from "@/components/Util/commonFunctions"
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });

export default function ProductSummaryTwo ({ data, price, stockStatus = "" }) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl text-gray-900">
                {data?.name}
            </h1>
            <div className="flex items-baseline space-x-4">
                <div className="flex items-baseline">
                    <RatingComponent value={data?.rating_summary} />
                    {/* <span className="ml-2 text-sm text-gray-500">
                        {ratingCountShow(data?.rating_summary)} Reviews
                    </span> */}
                </div>
               
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 ">
                    <Price amount={price} />
                </span>
                <span className="text-sm font-medium text-green-600">
                    {getStockStatus(stockStatus) || "IN STOCK"}
                </span>
            </div>
            <div className="flex items-center text-left w-full justify-end text-sm text-gray-500 pb-5 ">
                <span>SKU#: {data?.sku}</span>
                
            </div>
        </div>
    )
}