import { useTranslations } from 'next-intl';
import React from 'react'
import { PAYMENT_STATUS } from '../Checkout/Extra';

export default function PaymentMethod({setPaymentMethod ,paymentMethod , title=''}) {
    const t = useTranslations("Checkout");
    return (
        < >
           {title ? title : <p>{t("SelectPaymentMethod")}</p> }
            <div>
                <div className="py-2 flex gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="stripe"
                        name="payment-method"
                        className="cursor-pointer"
                        value="stripe"
                        checked={paymentMethod === PAYMENT_STATUS.STRIPE}
                        onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    <label htmlFor="stripe" className="cursor-pointer">
                        {t("StripePayment")}
                    </label>
                </div>
                <div className="py-2 flex gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="paypal"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === PAYMENT_STATUS.PAYPAL }
                        className="cursor-pointer"
                        onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    <label htmlFor="paypal" className="cursor-pointer">
                        {t("PayPalPayment")}
                    </label>
                </div>
            </div>
        </>
    )
}
