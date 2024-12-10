'use client'
import React, { useEffect, useState } from 'react'
import { className } from './Extra';
import { SET_GUEST_EMAIL_ON_CART } from '@/lib/graphql/queries/checkout';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { validateEmail, useDebounce, addressFormate } from "./Extra";
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from '@/lib/redux/slices/cartSlice';
import { EditSvg, EmailSvg } from '../SvgFiles/SvgFile';
import "react-toastify/dist/ReactToastify.css";

export default function Email({ isEditable, ClassName,emailRef}) {
    const [editEmail, setEditEmail] = useState(false);
    const [guestEmail, setGuestEmail] = useState("");
    const [submitEmail, setSubmitEmail] = useState(false);
    const [setGuestEmailOnCart] = useMutation(SET_GUEST_EMAIL_ON_CART);
    const debouncedEmail = useDebounce(guestEmail, 500);

    const t = useTranslations("Checkout");
    const dispatch = useDispatch();

    const { cart_id, cart, token: token } = useSelector((state) => state.customer);

    useEffect(() => {
        if (cart?.email) {
            setGuestEmail(cart?.email);
            setEditEmail(true);
        }
    }, [cart])


    useEffect(() => {
        if (debouncedEmail) {
            const valid = validateEmail(debouncedEmail);
            if (valid) {
                handleEmailCheck(debouncedEmail);
            }
        }
    }, [debouncedEmail]);

    const handleEmailCheck = async (email) => {
        if (!email || !submitEmail) return;
        setGuestEmailOnCart({
            variables: {
                cart_id: cart_id,
                email: email,
            },
            onError: (error) => {
                return toast.error(error);
            },
            onCompleted(res) {
                dispatch(fetchCart());
                setEditEmail(true);
                toast.success(t("EmailSubmit"));
            },
        });
    };


    return (
        <div className={"w-full h-fit py-4 my-4"}>
            {editEmail ? (
                <>
                    <div className="flex items-center mb-4 justify-between">
                        <h5 className="text-2xl font-medium">{t("ContactInfo")} </h5>
                        {!isEditable && !token ? <button
                            className="text-primary text-lg"
                            onClick={(e) => setEditEmail(!editEmail)}
                        >
                            <EditSvg />
                        </button> : ''}
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">

                        <div className="text-slate-400 w-3/5 flex">
                            {" "}
                            <EmailSvg className="mt-1.5 mr-2" /> {guestEmail}
                        </div>
                    </div>
                </>
            ) : (

                <div className="lg:col-span-6">
                    <label className="form-label font-semibold">
                        {t("YourEmail")} <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        ref={emailRef}
                        className={'w-full custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]'}
                        placeholder="Email"
                        name="email"
                        required
                        value={guestEmail}
                        onChange={(e) => {
                            setGuestEmail(e.target.value);
                            setSubmitEmail(true);
                        }}
                    />
                </div>
            )}
        </div>
    )
}
