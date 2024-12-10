import ProductCommentSection from '@/components/Product/CommentSection';
import { GET_CUSTOMER_REVIEW_TOKEN } from '@/lib/graphql/queries/reviews';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import dummyImage from "@/assets/Images/DummyUser.png"
import dynamic from "next/dynamic";
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });


export default function ProductReview ({ data }) {
    const { data: reviewRatingData, refetch } = useQuery(GET_CUSTOMER_REVIEW_TOKEN)

    const [reviewRating, setReviewRating] = useState()
    useEffect(() => {
        setReviewRating(reviewRatingData?.customer?.reviews)
    }, [reviewRatingData])

    const productName = data?.name
    const getSpecificReview = reviewRating?.items?.filter((item) => (item?.product?.name == productName))





    return (
        <div className="container mx-auto md:p-6 pt-2">
            <div className='md:flex gap-9'>
                <div className="space-y-6 md:max-w-[58.3%]">
                    {getSpecificReview?.map((review, index) => (
                        <div key={index} className="border border-gray-300 rounded-md p-4 flex space-x-4">
                            <img src={dummyImage?.src}  className="h-16 w-16 rounded-full" alt={review?.nickname}/>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{review?.nickname}</h3>
                            <RatingComponent value={review?.average_rating} />

                               
                                <p className="text-gray-700 mt-2">{review?.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" w-full">
                    <h3 className="text-base font-bold mb-2">Add a Review</h3>
                    <ProductCommentSection productsDetails={data} refetch={refetch}/>
                </div>
            </div>
        </div>

    );
};

