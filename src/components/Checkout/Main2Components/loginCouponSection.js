"use client"
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';
const LoginForm = dynamic(() => import('@/components/Util/Form/LoginForm'), { ssr: false });
const Coupon = dynamic(() => import('@/components/Checkout/coupon'), { ssr: false });
const AnimationLayout = dynamic(() => import('@/components/Checkout/Main2Components/AnimationLayout'), { ssr: false });

export default function loginCouponSection() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isCouponFormVisible, setIsCouponFormVisible] = useState(false);
  const t = useTranslations("Checkout");

  const userToken = localStorage.getItem("token");


  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-2">
      <div className='lg:col-span-7   '>
       {!userToken ? <div className="p-4 rounded-lg md:flex-1">
          <button
            onClick={() => setIsLoginFormVisible(!isLoginFormVisible)}
            className="flex items-center justify-between w-full text-left text-red-700 font-semibold bg-red-50"
          >
            <div className="bg-red-50 p-2 md:p-4 text-red-700">
              <span className="font-semibold"> {t("Returningcustomer")} </span> {t("Clicklogin")}
            </div>
            {isLoginFormVisible ? <ChevronUp className="h-5 w-5 mr-2" /> : <ChevronDown className="h-5 w-5 mr-2" />}
          </button>

          <AnimationLayout open={isLoginFormVisible} >
            <div className="space-y-4">
              <LoginForm className="py-2" />
            </div>
          </AnimationLayout>
        </div> :'' }
      </div>
      <div className="lg:col-span-5">
        <div className="p-4 rounded-lg md:flex-1">
          <button
            onClick={() => setIsCouponFormVisible(!isCouponFormVisible)}
            className="flex items-center justify-between w-full text-left text-red-700 font-semibold bg-red-50 "
          >
            <div className="bg-red-50 p-2 md:p-4 text-red-700">
              <span className="font-semibold">{t("HaveACoupon")}</span> {t("ClickHereEnterCode")}
            </div>
            {isCouponFormVisible ? <ChevronUp className="h-5 w-5 mr-2" /> : <ChevronDown className="h-5 w-5 mr-2" />}
          </button>

          <AnimationLayout open={isCouponFormVisible} >
            <div className="space-y-4">
              <Coupon className="bg-primary text-white hover:bg-primary" />
            </div>
          </AnimationLayout>
        </div>
      </div>
    </div>
  )
}
