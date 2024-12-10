import React from 'react'
import { ratingCountShow } from '../Util/commonFunctions';
// import Price from '@/components/Currency/Price';
// import RatingComponent from '../Common/Rating/Rating';
import dynamic from 'next/dynamic' 
const RatingComponent = dynamic(() => import('../Common/Rating/Rating'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function index({ data , price=0 }) {
    return (
        <div className="mt-2">
            <span className=" font-semibold me-1">
                <Price amount={price}/>
            </span>
            <ul className="list-none inline-block text-orange-400">
                <RatingComponent value={data?.rating_summary} />
                <li className="inline "> {ratingCountShow(data?.rating_summary)} {`(${data?.review_count || 0})`} </li>
            </ul>
        </div>
    )
}