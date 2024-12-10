"use client";
import React, { useEffect, useState } from 'react';
import CustomLink from '../CustomLink/Link';
import { ChevronRight } from 'lucide-react';
import furnitureBanner from '@/assets/Images/furniture-banner.webp';

export default function Index({ textCenter = '', breadcrumbsData, loading = true, showBanner = true }) {
    const [breadcrumbs, setBreadcrumbs] = useState({});

    useEffect(() => {
        setBreadcrumbs(breadcrumbsData);
    }, [loading, breadcrumbsData]);

    const hasBreadcrumbs = breadcrumbs?.breadcrumbs?.length > 0;

    const backgroundImage = loading ? 'none' : breadcrumbs.name === 'Shop' ? `url(${furnitureBanner.src})` : `url(${[undefined, ''].includes(breadcrumbsData?.banner_image) ? breadcrumbsData.banner_image : breadcrumbsData.banner_image ? breadcrumbsData.banner_image : furnitureBanner.src})`;

    return (
        <section
            className={`relative table w-full  ${showBanner ? "md:pb-16 py-4" : "text-black dark:text-white "
                } bg-gray-50 dark:bg-slate-800 bg-center bg-no-repeat bg-cover`}
            style={{ backgroundImage: showBanner ? backgroundImage : "", backgroundColor: !showBanner ? "#efefef" : '' }}
        >
            {showBanner && (
                <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div>
            )}
            <div className={`container m-auto relative px-5 md:px-0  ${showBanner ? "text-white pt-10" : "text-black dark:text-white py-6"}`} >
                {loading ? (
                    <div className="flex gap-5">
                        <div className="text-2xl md:text-3xl font-semibold leading-normal">
                            <div className="h-8 w-[100px] bg-gray-200 dark:bg-slate-600 rounded"></div>
                        </div>
                        <div className="relative">
                            <div className="h-8 w-[100px] bg-gray-200 dark:bg-slate-600 rounded"></div>
                        </div>
                    </div>
                ) : (
                    breadcrumbs && (
                        <>
                            {showBanner && (<div className="grid grid-cols-1 mt-20 md:mt-14">
                                <h1 className="text-2xl md:text-3xl font-semibold leading-normal">
                                    {breadcrumbs.name}
                                </h1>
                            </div>)}
                            <div className={`relative ${!showBanner ? 'text-[#444444]' : "mt-3 "}`}>
                                <ul className={`flex tracking-[0.5px] mb-0 inline-block ${textCenter} `}>
                                    <li className={`${!showBanner ? 'text-[#444444] text-base hover:text-secondary' : "uppercase md:text-[13px] text-primary dark:text-primary-light"} text-[10px]`}>
                                        <CustomLink href="/" as="/" className="flex items-center justify-center">
                                            Home
                                            {hasBreadcrumbs && <ChevronRight className="p-1" />}
                                        </CustomLink>
                                    </li>

                                    {hasBreadcrumbs
                                        ? breadcrumbs.breadcrumbs.map((breadcrumb) => (
                                            <li key={breadcrumb.category_id} className="text-base duration-500 ease-in-out hover:text-secondary">
                                                <CustomLink href={`/${breadcrumb.category_url_path}${breadcrumbs.url_suffix}`} className="flex items-center justify-center">
                                                    {breadcrumb.category_name}
                                                    <ChevronRight className="p-1" />
                                                </CustomLink>
                                            </li>
                                        ))
                                        : (
                                            <li className="text-base text-[#444444] hover:text-secondary">
                                                <ChevronRight className="md:pb-0 pb-1 text-sm" />
                                            </li>
                                        )
                                    }

                                    <li className="text-base duration-500 ease-in-out flex">
                                        {breadcrumbs.name}
                                    </li>
                                </ul>

                            </div>
                        </>
                    )
                )}
            </div>
        </section>

    );
}
