"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
// import { useSelector } from 'react-redux';
// const HeaderOne = dynamic(() => import('@/components/Common/header/header').then((mod) => mod.default), { ssr: false });
// const HeaderTwo = dynamic(() => import('@/components/Common/header/header2').then((mod) => mod.default), { ssr: false });
// const HeaderThree = dynamic(() => import('@/components/Common/header/header3').then((mod) => mod.default), { ssr: false });
// const HeaderFour = dynamic(() => import('@/components/Common/header/header4').then((mod) => mod.default), { ssr: false });
const HeaderFive = dynamic(() => import('@/components/Common/header/header5').then((mod) => mod.default), { ssr: false });
const LoadingBar = dynamic(() => import('@/components/Common/LoadingComponent/LoadingBar').then((mod) => mod.default), { ssr: true });

// const headerComponents = {
//     HeaderOne,
//     HeaderTwo,
//     HeaderThree,
//     HeaderFour,
//     HeaderFive
// };

export default function Main({ navBarOptions = {} }) {
    // const [headerLayoutName, setHeaderLayoutName] = useState('');
    // const [isLoading, setIsLoading] = useState(true);
    // const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    // useEffect(() => {
    //     if (storeConfigData?.availableStores) {
    //         setHeaderLayoutName(storeConfigData?.availableStores[0]?.layoutSetting?.header || "HeaderOne");
    //         setIsLoading(false);
    //     }
    // }, [storeConfigData?.availableStores]);
    // const SelectedDrawer = headerComponents[headerLayoutName] || HeaderOne;

    return (
        <>
            <HeaderFive navBarOptions={navBarOptions} isLoading={navBarOptions?.length > 0 ? false : true}/>
            <LoadingBar />
        </>
    )
}
