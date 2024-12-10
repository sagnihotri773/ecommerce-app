import React from 'react';
import { useQuery } from '@apollo/client';
import { SwiperSlide } from 'swiper/react';
import SwiperLayout from './SwiperLayout';
import dummyImage from '@/assets/Images/DummyUser.png';
import { GET_FIVE_STAR_REVIEWS } from '@/lib/graphql/queries/customer';
import { Rating } from '@material-tailwind/react';


export default function CustomerReviews() {
    const { loading, error, data } = useQuery(GET_FIVE_STAR_REVIEWS, {
        variables: { limit: 50 },
    });
    
    return (
        <div className="container-fluid relative my-6 mt-20 lg:mx-6 mx-3">
            <div className="grid grid-cols-1 justify-center text-center mb-6">
                <h5 className="font-semibold text-3xl leading-normal mb-4">
                    Customer Reviews
                </h5>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Customers love our products and we always strive to please them all.
                </p>
            </div>
            <div className="flex justify-center relative mt-10">
                <div className="relative lg:w-1/3 md:w-1/2 w-full">
                    <div className="absolute -top-20 md:-start-24 -start-0">
                        <i className="mdi mdi-format-quote-open text-9xl opacity-5" />
                    </div>
                    <div className="absolute bottom-28 md:-end-24 -end-0">
                        <i className="mdi mdi-format-quote-close text-9xl opacity-5" />
                    </div>
                    <SwiperLayout>
                        {data?.fiveStarReviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="tiny-slide tns-item">
                                    <div className="text-center">
                                        <p className="text-lg text-slate-400 italic">
                                            {review.detail}
                                        </p>
                                        <div className="text-center mt-5">
                                            <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                                <Rating value={review?.rating} readonly/>
                                                
                                            </ul>
                                            <img
                                                src={review.img || dummyImage.src}
                                                className="h-14 w-14 rounded-full shadow-md dark:shadow-gray-700 mx-auto"
                                                alt=""
                                            />
                                            <h6 className="mt-2 font-medium"> {review?.nickname} </h6>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </SwiperLayout>

                </div>
            </div>
        </div>

    )
}
