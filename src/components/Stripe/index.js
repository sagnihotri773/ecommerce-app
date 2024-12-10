'use client'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Payment({ genrateCardId, formRef, paymentLoading, className='w-full h-fit rounded-[8px] border border-[#CACBCF] shadow py-4 px-5 mt-4' }) {
    const stripe = useStripe();
    const elements = useElements();
    const t = useTranslations("Checkout");

    const handleSubmitStripe = async (e) => {
        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (error) {
            return toast.error(error.message);

        } else {
            paymentLoading(true);
            setTimeout(() => {
                genrateCardId(paymentMethod);
            }, 2000);
        }
    };

    formRef.current = {
        submitForm: handleSubmitStripe
    };

    return (
        <>
            <div className={className}>
                <h3 className="text-2xl leading-normal font-semibold mt-6"> {t("Payment")} </h3>

                <form ref={formRef} onSubmit={handleSubmitStripe} className="mt-6 w-full max-w-md mx-auto px-4">
                    <div className="border p-3 sm:p-4 rounded-xl">
                        <CardElement options={{
                            style: {
                                base: {
                                  fontSize: '16px',
                                  '@media (min-width: 640px)': {
                                    fontSize: '18px',
                                  },
                                  '@media (min-width: 1024px)': {
                                    fontSize: '20px',
                                  },
                                },
                              },
                        }} />
                    </div>
                </form>
            </div>
        </>
    )
}