import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from 'next-intl';
import ShippingMethod from '../ShippingMethod';

export default function DeliveryMethod({ shippingMethod = [], shippingMethodValue = null, titleShow, methodRef }) {
    const t = useTranslations("Checkout");

    return (
        <div className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px] aos-init aos-animate">
            <div className="sub-title mb-[12px]">
                <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                   {t('DeliveryMethod')}
                </h4>
            </div>
            <div className="checkout-method mb-[24px]">
                <span className="details font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-medium text-[#686e7d]">
                    {t('DeliveryMethodMessage')}
                </span>
                <div className="bb-del-option flex mt-[12px] max-[480px]:flex-col">
                    <div className="inner-del w-[50%] max-[480px]:w-full max-[480px]:mb-[8px]">
                        <span className="bb-del-head font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-semibold text-[#3d4750]">
                            {titleShow ? t("SelectShippingMethod") : ' '}
                        </span>
                        <ShippingMethod shippingMethod={shippingMethod} shippingMethodValue={shippingMethodValue} titleShow={false} methodRef={methodRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}
