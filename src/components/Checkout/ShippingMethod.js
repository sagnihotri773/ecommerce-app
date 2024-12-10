'use client'
import React, { useEffect, useState } from 'react';
import { SET_SHIPPING_METHODS } from '@/lib/graphql/queries/checkout';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '@/lib/redux/slices/cartSlice';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function ShippingMethod({ shippingMethod, shippingMethodValue = null, titleShow = true, methodRef }) {
    const [setShippingMethods] = useMutation(SET_SHIPPING_METHODS);
    const [selectedMethodCode, setSelectedMethodCode] = useState(null);
    const [isLoading, setIsloading] = useState(false);

    const t = useTranslations("Checkout");
    const dispatch = useDispatch();
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);

    useEffect(() => {
        setSelectedMethodCode(shippingMethodValue);
    }, [shippingMethodValue]);

    const handleShippingMethodChange = (methodCode, carrier_code) => {
        setIsloading(true);
        setShippingMethods({
            variables: {
                cart_id: cartId,
                method_code: methodCode,
                carrier_code: carrier_code,
            },
            onError: (error) => {
                setIsloading(false);
                toast.error(error[0] || error);
            },
            onCompleted: (res) => {
                setIsloading(false);
                dispatch(fetchCart());
                toast.success(t("ShippingMethodSet"));
                setSelectedMethodCode(methodCode);
            },
        });
    };

    return (
        shippingMethod?.length > 0 && (
            <div className="py-2">
                {titleShow ? <p>{t("SelectShippingMethod")}</p> : ' '}
                {shippingMethod.map((item, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <input
                            type="radio"
                            name="shipping-method"
                            value={item.method_code}
                            className="text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px] cursor-pointer"
                            checked={selectedMethodCode == item?.method_code}
                            disabled={isLoading}
                            onChange={() =>
                                handleShippingMethodChange(
                                    item?.method_code,
                                    item?.carrier_code
                                )
                            }
                        />
                        <label
                            htmlFor="rate1"
                            className="relative pl-[15px] cursor-pointer leading-[16px] text-xl  inline-block text-black tracking-[0]"
                        > {item.method_code} <Price amount={item?.amount?.value} />
                        </label>
                    </div>
                ))}
            </div>
        )
    )
}
