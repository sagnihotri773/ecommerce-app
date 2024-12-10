"use client"
import { formatDate } from '../Util/commonFunctions'

import dynamic from "next/dynamic";
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });
const ProductCommentSection = dynamic(() => import('@/components/Product/CommentSection'), { ssr: false });

export default function ProductsReview({ customerReviews = [], productsDetails }) {
    
    return (
        <div>

            {customerReviews?.length > 0 ? customerReviews?.map((val, index) => (
                <div className="mt-8 first:mt-0" key={index}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="ms-3 flex-1">
                                <span
                                    className="text-lg font-semibold hover:text-primary duration-500"

                                >
                                    {val.nickname}
                                </span>
                                <p className="text-sm text-slate-400">{formatDate(val.created_at)}  </p>
                            </div>
                        </div>

                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                        <ul className="list-none inline-block text-orange-400">
                            <RatingComponent value={val.average_rating} />

                        </ul>
                        <p className="text-slate-400 italic">
                            {val.text}
                        </p>
                        <p className="text-slate-400 italic">
                            {val.summary}
                        </p>
                    </div>
                </div>
            )) : ' '}
            <ProductCommentSection productsDetails={productsDetails} />
        </div>
    )
}