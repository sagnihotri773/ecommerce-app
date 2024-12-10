"use client"
import React, { useEffect, useState } from 'react';
import ThankEvenelope from '@/assets/Images/thank-evenelope.png';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExtraSmButton } from '../Util/Button/Extra-sm';
import { guestFormUrl, shopUrl, viewOrderUrl } from "@/components/RouteManager";

export default function Thanks1() {
    const [fetchData, setFetchData] = useState(true);
    const searchParamsa = useSearchParams();
    const order_id = searchParamsa.get("order_id");
    const router = useRouter();
  
    const cart_id = localStorage.getItem("cart_id");
    const token = localStorage.getItem("token")
    useEffect(() => {
      if (cart_id && fetchData) {
        setFetchData(false);
  
      }
    }, [cart_id]);
  
    const redirect = () => {
      if (!token) {
        router.push(guestFormUrl);
      } else {
        router.push(`${viewOrderUrl}/${order_id}`);
      }
    };
    return (
        <div className="flex justify-center">
            <div className="lg:w-1/2 md:w-2/3 sm:w-5/6">
                <div className="text-center ">
                    <h2 className="text-[40px] font-bold mb-12 m-auto md:max-w-[500px]">Thank you for purchased this products!!</h2>
                    <div className="flex justify-center">
                        <img src={ThankEvenelope.src} alt="Thank You Envelope" className="w-auto h-auto" />
                    </div>

                    <p className={"text-xl text-center text-[#545454] mt-[22px] "}>
                        Your order ID is #{order_id}.<br />
                        You will receive a confirmation email shortly.
                    </p>
                    <div className="flex gap-6 justify-center text-white">
                        <ExtraSmButton handleClick={() => {
                            router.push(shopUrl);
                        }} title="Shop More" />
                        <ExtraSmButton handleClick={() => {
                            redirect();
                        }} title="View Order" />

                    </div>
                </div>
            </div>
        </div>
    )
}
