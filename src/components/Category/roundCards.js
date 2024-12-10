import React, { useMemo } from 'react';
import Image from 'next/image';
import Man from '@/assets/Images/mens-ware.jpg';
import LoadingState from './LoadingState';
import { Link } from "@/components/ui/Link";
import { useTranslations } from 'next-intl';

export default function RoundCards({ data = [] }) {
    // Memoize the getImg function to prevent re-creation on each render
    const getImg = useMemo(() => (img) => img || Man, []);
    const t = useTranslations("Dashboard");

    // Conditional rendering based on data availability
    if (!data.length) {
        return <LoadingState />;
    }

    return (
        <>
            <div className="grid grid-cols-1 justify-center text-center mb-6">
                <h2 className="font-semibold text-3xl leading-normal mb-4">
                    {t("ShopCollections")}
                </h2>
                <p className="text-black max-w-xl mx-auto">
                    {t("ShopLatestCollections")}
                </p>
                {!data || data.length === 0 ?
                    <p className="text-red-500"> {t("NoCategoriesAvailable")} </p> : ''
                }
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 p-4 gap-6">
                {data.map((val) => (
                    <Link
                        className="text-center hover:text-primary"
                        href={`/${val.url}`}
                        key={val.id || val.url}
                        as={`/${val.url}`}
                        prefetch={true}
                    >
                        <Image
                            src={getImg(val.image)}
                            className="rounded-full shadow dark:shadow-gray-800 md:h-[250px] md:w-[250px]"
                            alt={"Category"}
                            width={250}
                            height={250}
                            loading="lazy"
                            layout="fixed"
                        />
                        <span className="text-xl font-medium mt-3 block">{val.name}</span>
                    </Link>
                ))}
            </div>

        </>
    );
}
