"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExtraSmButton } from '../Util/Button/Extra-sm';
import { guestFormUrl, shopUrl, viewOrderUrl } from "@/components/RouteManager";
import ThankYouGradient from '../../assets/Images/thank-you-gradient.png';
import { ThanksOrderSvg } from '../SvgFiles/SvgFile';

export default function Thanks2() {
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
        <div className={"rounded py-12  "}>
            <h3 className={"text-[40px] font-bold text-center  pt-4  "} >
                Thank you for purchased this products!!
            </h3>
            <div className={"w-fit mx-auto mt-[22px]"}>
                <ThanksOrderSvg />
            </div>

            <p className={"text-xl text-center text-[#545454] mt-[22px]"}>
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
    )
}
