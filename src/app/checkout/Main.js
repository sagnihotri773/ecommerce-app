'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '@/lib/redux/slices/cartSlice';
import { EmptyCart } from '@/components/Cart/EmptyCart';
import { renderHtmlDynamic } from '@/components/Util/commonFunctions';
// import Main from '@/components/Checkout/Main3';
import dynamic from 'next/dynamic'
const CheckoutOne = dynamic(() => import('@/components/Checkout/Main'), { ssr: false });
const CheckoutTwo = dynamic(() => import('@/components/Checkout/Main2'), { ssr: false });
const CheckoutThree = dynamic(() => import('@/components/Checkout/Main3'), { ssr: false });
const Breadcrumb = dynamic(() => import('@/components/Common/BreadCrumbs/index'), { ssr: false });

const headerComponents = {
    CheckoutOne,
    CheckoutTwo,
    CheckoutThree,
};


export default function Main() {
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);
    const [isLoading, setIsLoading] = useState(true);
    const [checkOutData, setCheckOutData] = useState({});
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
    // const [checkoutLayoutName, setCheckOutLayoutName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [])

    useEffect(() => {
        if (cart?.items?.length == 0) {
            setIsLoading()
        }
    }, [cart])

    const breadcrumbs = {
        title: 'Fashion',
        pageUrl: `/`,
        pageName: 'CHECKOUT'
    }



    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setCheckOutData(storeConfigData?.availableStores[0]?.staticContent?.checkoutPage);
            // setCheckOutLayoutName(storeConfigData?.availableStores[0]?.layoutSetting?.checkout || "CheckoutOne");
        }
    }, [storeConfigData?.availableStores])
 
    // const SelectedDrawer = headerComponents[checkoutLayoutName] || CheckoutOne;

    return (
        <div>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            {isLoading ?
                <section className="relative py-4">
                    {/* {renderHtmlDynamic(checkOutData?.topContent)} */}
                    <CheckoutThree />
                    {/* {renderHtmlDynamic(checkOutData?.bottomContent)} */}

                </section> :
                <div className="flex justify-center items-center h-full mt-20">
                    <EmptyCart />
                </div>}
        </div>
    )
}
