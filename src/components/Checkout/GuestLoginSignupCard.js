"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { registerUrl } from '../RouteManager';
import { DRAWER_TYPE } from '../Util/commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import { useTranslations } from 'next-intl';


export default function GuestLoginSignupCard({ token }) {
    const [userToken, setUserToken] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const t = useTranslations("Checkout");

    useEffect(() => {
        setUserToken(token ? true : false)
    }, [token])

    const handleRedirect = (routeName) => {
        router.push(routeName);
        saveRoutePath(location?.pathname);
    }

    const handleOpenDrawer = (type) => {
        dispatch(openDrawer({ type }));
    };

    return (
        !userToken && (
            <div className="w-full h-fit rounded-[8px] border border-[#CACBCF] shadow py-4 px-5">
                <div className="text-primary   text-3xl font-bold">
                    {t('Checkout')}
                </div>
                <div className="text-[#545454] text-[23px] font-medium">
                {t('HaveAnAccount')}
                </div>
                <div className="text-[#545454] text-[18px]">
                    {t('SignInToCheckoutFaster')}
                </div>
                <div className="grid grid-cols-2 mt-4 gap-1.5">
                    <span className="bg-primary rounded-[6px] h-12 text-white text-[18px] font-semibold flex justify-center items-center cursor-pointer" onClick={(e) => handleOpenDrawer(DRAWER_TYPE.USER)}>
                       {t("SignIn")}
                    </span>
                    <span className="bg-white border border-[#CACBCF] rounded-[6px] h-12 text-primary text-[18px] font-semibold flex justify-center items-center cursor-pointer" onClick={(e) => handleRedirect(registerUrl)}>
                        {t("CreateAccount")}
                    </span>
                </div>
            </div>
        )
    )
}
