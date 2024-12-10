import React from "react";
import Image from "next/image";
import Man from "@/assets/Images/mens-ware.jpg";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";

// Utility function to get image
const getImg = (img) => img || Man;

export default function SquareCards({ data = [], loading }) {
    const t = useTranslations("Dashboard");

    // Render skeleton loader
    const renderSkeletonLoader = () => (
        <div className="grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-4 md:p-0 gap-6 h-100">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 animate-pulse"
                >
                    <div className="absolute inset-0 bg-gray-300"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black bg-gray-200 rounded uppercase h-9 w-32"></span>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render card list
    const renderCards = () =>
        data.map((category) => (
            <Link
                key={category.name}
                href={category?.url || ''}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 transition-opacity"
            >
                <Image
                    src={getImg(category.image)}
                    alt={`Image of ${category.name}`}
                    className="object-cover w-full h-100 transition-transform duration-1000 group-hover:scale-125"
                    width={800}
                    height={600}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={Man.src} // Use a low-quality placeholder
                    decoding="async"
                    quality={60}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold hover:text-white hover:bg-secondary text-black bg-white rounded uppercase transition duration-300 ease-in-out">
                        {category.name}
                    </span>
                </div>
            </Link>
        ));

    return (
        <div className='container relative m-auto py-16'>
            <div className="grid grid-cols-1 justify-center text-start mb-6 px-4 md:px-0">
                <h2 className="font-normal text-3xl leading-normal mb-4">
                    Popular Categories
                </h2>
                {data.length === 0 && !loading && (
                    <p className="text-red-500">{t("NoCategoriesAvailable")}</p>
                )}
            </div>
            {loading ? renderSkeletonLoader() : <div className="grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-4 md:p-0 gap-6 h-100">{renderCards()}</div>}
        </div>
    );
}
