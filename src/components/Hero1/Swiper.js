"use client";
import React, { useMemo } from "react";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { SwiperSlide } from "swiper/react";
import SwiperLayout from "./SwiperLayout";
import "swiper/css";
import { GET_CAROUSELS_BY_CATEGORY } from "@/lib/graphql/queries/category";
import { useQuery } from "@apollo/client";

export default function Swiper() {
    const t = useTranslations("Dashboard");

    const { data } = useQuery(GET_CAROUSELS_BY_CATEGORY, {
        variables: { identifier: 'home' },
        fetchPolicy: 'network-only',
    });

    const slides = useMemo(() => data?.getCarouselsByCategoryIdentifier || [], [data]);

    return (
        <div className="main-section">
            <SwiperLayout>
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <section
                            className="slide-inner relative w-full h-full bg-blue-600/5 flex items-center bg-cover bg-no-repeat"
                            style={{
                                backgroundImage: `url(${typeof window !== 'undefined' && window.innerWidth < 768 ? slide.mobile_image : slide.image})`,
                                height: '100vh'
                            }}
                        >
                            <div className="m-auto md:m-[232px] relative">
                                <div className="grid grid-cols-1 justify-center">
                                    <div className="text-start w-full">
                                        <h4 className="md:text-6xl text-4xl font-bold my-3">
                                            {slide.text}
                                        </h4>
                                        <div className="mt-6">
                                            <Link
                                                href="/shop"
                                                prefetch={true}
                                                className="py-2 px-5 inline-block font-semibold bg-slate-900 dark:bg-primary text-white rounded-md"
                                            >
                                                {t("Shop")} <i className="mdi mdi-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </SwiperLayout>
        </div>
    );
}
