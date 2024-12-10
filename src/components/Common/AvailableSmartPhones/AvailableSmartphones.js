import React from 'react'
import { shopCartUrl } from '@/components/RouteManager'
import { CellPhoneSvg } from '../../SvgFiles/SvgFile'
import googlePlayImage from "@/assets/Images/googlePlay.png"
import appStoreImage from "@/assets/Images/appStore.png"
export default function AvailableSmartphones() {
    const t = useTranslations("Common");

    return (
        <div className="container m-auto relative md:mt-24 mt-16">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                <div className="lg:col-span-5 md:col-span-6">
                    <img
                        src="https://cartzio.vercel.app//static/media/envelope.1faa5c4e724fd8c007b0a41085ff50d8.svg"
                        className="mx-auto d-block"
                        alt=""
                    />
                </div>
                <div className="lg:col-span-7 md:col-span-6">
                    <span className="bg-orange-500/5 text-primary text-xs font-bold px-2.5 py-0.5 rounded h-5">
                        {t("MobileApps")}
                    </span>
                    <h4 className="font-semibold text-3xl leading-normal my-4">
                        {t("AvailableForYour")} <br /> {t('Smartphones')}
                    </h4>
                    <p className="text-slate-400 max-w-xl mb-0">
                       {t('UpgradeYourStyle')}
                    </p>
                    <div className="my-5">
                        <a href={shopCartUrl}>
                            <img
                                src={appStoreImage?.src}
                                className="m-1 inline-block"
                                alt=""
                            />
                        </a>
                        <a href={shopCartUrl}>
                            <img
                                src={googlePlayImage?.src}
                                className="m-1 inline-block"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="inline-block">
                        <div className="pt-4 flex items-center border-t border-gray-100 dark:border-gray-800">
                            <CellPhoneSvg/>
                            <div className="content">
                                <h6 className="text-base font-medium">
                                {t('InstallApp')} 
                                </h6>
                                <a className="text-primary" href={shopCartUrl}>
                                {t('LearnMore')}  <i className="mdi mdi-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
