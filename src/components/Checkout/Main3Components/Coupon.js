"use client"
import { APPLY_COUPON_TO_CART } from '@/lib/graphql/queries/checkout';
import { fetchCart } from '@/lib/redux/slices/cartSlice';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function Coupon() {
    const t = useTranslations("Checkout");
    const [error, setError] = useState("");
    const cartId = useSelector((state) => state.customer.cart_id);
    const dispatch = useDispatch()
    const [applyCouponToCart, { loading, data }] = useMutation(APPLY_COUPON_TO_CART);

    if (error) {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        applyCouponToCart({
            variables: {
                cart_id: cartId,
                coupon_code: data?.promo,
            },
            onError(err) {
                setError(err.message);
            },
            onCompleted(res) {
                dispatch(fetchCart())
                reset();
            },
        });
    };
    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                    <input
                        className="uppercase w-full p-[10px] cursor-pointer md:text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                        type="text"
                        placeholder="Enter coupon Code"
                        name="promo"
                        required
                        {...register('promo', { required: "This field is require" })}
                    />
                    <button
                        className="transition duration-300 ease-in-out my-2 mx-2 flex justify-center items-center absolute top-0 right-0 bottom-0 font-Poppins leading-7 tracking-[0.03rem] py-2 px-3 text-sm text-white bg-primary rounded-lg border border-primary hover:bg-transparent hover:border-primary hover:text-[#3d4750]"
                        type="submit"
                        disabled={loading}
                        loading={loading}
                    >
                        {loading ? "Sending..." : ' Apply'}
                    </button>
                </form>
            </FormProvider>
            <div className="text-center">
                {error ? <p className="text-[red] mt-0">{error}</p> : ""}
            </div>

        </>
    )
}
