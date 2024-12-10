import { useTranslations } from 'next-intl';
import React from 'react'

export default function services() {
  const t = useTranslations("Services");

    return (
        <div className="grid grid-cols-1">
            <div className="py-[30px] px-0 border-t border-slate-800">
                <div className="grid lg:grid-cols-4 md:grid-cols-2">
                    <div className="flex items-center lg:justify-center">
                        <i className="align-middle text-lg mb-0 me-2 mdi mdi-truck-check-outline" />
                        <h6 className="mb-0 font-medium">{t("FreeDelivery")}</h6>
                    </div>
                    <div className="flex items-center lg:justify-center">
                        <i className="align-middle text-lg mb-0 me-2 mdi mdi-archive" />
                        <h6 className="mb-0 font-medium"> {t("NonContactShipping")} </h6>
                    </div>
                    <div className="flex items-center lg:justify-center">
                        <i className="align-middle text-lg mb-0 me-2 mdi mdi-cash-multiple" />
                        <h6 className="mb-0 font-medium"> {t("SecurePayments")}</h6>
                    </div>
                    <div className="flex items-center lg:justify-center">
                        <i className="align-middle text-lg mb-0 me-2 mdi mdi-shield-check" />
                        <h6 className="mb-0 font-medium"> {t("SecurePayments")}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
