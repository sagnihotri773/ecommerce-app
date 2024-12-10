"use client"
import React, { Suspense } from 'react';
import CustomLink from '../CustomLink/Link';
import { ChevronRight } from 'lucide-react';
import furnitureBanner from '@/assets/Images/furniture-banner.webp';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function Breadcrumbs({ breadcrumbs, showBanner = true }) {
  const { title = '', pageName = '', textCenter = '' } = breadcrumbs;
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
  const t = useTranslations("Breadcrumbs");

  const storeName = storeConfigData?.availableStores[0]?.store_name || '';
  const bannerImage = breadcrumbs?.banner_image || furnitureBanner.src;
  return (
    <section
      className={`relative  bg-center bg-no-repeat bg-cover ${showBanner ? "" : "text-black dark:text-white "
        }`}
      style={{ backgroundImage: showBanner ? `url(${bannerImage})` : "", backgroundColor: showBanner ? "" : "#efefef" }}
    >
      {showBanner && (

        <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div>
      )}

      <div className={`container mx-auto table w-full ${showBanner ? " md:pt-18 py-10" : "py-[22px]"} flex justify-between items-center lg:px-0 px-4 text-white z-50`}>
        {showBanner && (
          <div className="grid grid-cols-1 relative z-0">
            <h3 className={classNames('text-3xl leading-normal font-semibold text-white', textCenter)}>
              {storeName}
            </h3>
          </div>

        )}
        <Suspense fallback={<div className="w-3/5 h-4 bg-gray-300 animate-pulse rounded" ></div>} >
          <div className="relative">
            <ul className={classNames('tracking-[0.5px] mb-0 inline-block cursor-pointer', textCenter)}>
              <li className={`inline-block ${showBanner ? "text-white" : "text-[#444444]"
                }`}>
                <CustomLink href="/" as="/" className={`flex items-center text-base justify-center  ${showBanner ? "text-white uppercase hover:text-primary" : "text-[#444444] hover:text-secondary"
                  }`}>
                  {t("Home")}
                  <ChevronRight className="p-1" />
                </CustomLink>
              </li>

              {!pageName && (
                <li className="inline-block text-base text-[#444444] dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180">
                  <ChevronRight className="p-1" />
                </li>
              )}

              <li
                className={`inline-block  ${showBanner ? "text-white hover:text-primary" : "text-[#444444] hover:text-secondary"
                  }  text-base`}
                aria-current="page"
              >

                {pageName}
              </li>
            </ul>
          </div>
        </Suspense>
      </div>
    </section>
  );
}