"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import {
    getProductsPrice,
    truncateTitle,
} from "@/components/Util/commonFunctions";
import { openPopover } from "@/lib/redux/slices/popOverSlice";

const HoverAddToCartButtonV2 = dynamic(() => import("@/components/Util/Button/HoverAddToCartButtonV2"), { ssr: false });
const GridLayoutOne = dynamic(() => import("@/components/Common/ProductCard/GridLayoutOne"), { ssr: false });
const ProductsPopoverStyleTwo = dynamic(() => import("@/components/Common/Popover/PopOverStyleTwo"), { ssr: false });
const HoverAddToWishlistV4 = dynamic(() => import("@/components/Util/Button/AddToWishlistV4"), { ssr: false });

export default function CardTen({ product, gridView }) {
    const [selectedImage, setSelectedImage] = useState(product?.image?.url);
    const router = useRouter();
    const dispatch = useDispatch();
    const openProductPopover = () => {
        const products = { ...product };
        dispatch(openPopover(products));
    };

    return (
        <>
            {gridView === "grid-cols-1" ? (
                <GridLayoutOne product={product} />
            ) : (
                <div className={`cursor-pointer  relative p-4 md:p-0 flex-col`}>
                    <div
                        className={`relative group border overflow-hidden bg-gray-100 ${gridView === "grid-cols-1 md:grid-cols-2"
                            ? "aspect-[2/2]"
                            : "aspect-[3/4]"
                            }`}
                    >
                        <Image
                            src={selectedImage}
                            alt={product?.name}
                            fill
                            className={`object-cover transition-opacity duration-1000  group-hover:opacity-0`}
                            onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
loading="lazy"
                        />
                        <Image
                            src={product?.thumbnail?.url}
                            alt={`${product?.name} Thumbnail`}
                            fill
                            className={`absolute top-0 left-0 object-cover group-hover:scale-125 transition-transform duration-1000 delay-300 ease-in-out opacity-0 transition-opacity duration-1000 group-hover:opacity-100`}
                            onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
                        />
                        {product?.price_range?.minimum_price?.discount?.percent_off > 0 && (
                            <ul className="list-none absolute top-[10px] start-4 py-2">
                                <li>
                                    <span className="bg-[#D12A00] text-white font-semibold text-sm px-2 py-2 h-7">
                                        -{product?.price_range?.minimum_price?.discount
                                            ?.percent_off || 0}
                                        %
                                    </span>
                                </li>
                            </ul>
                        )}
                        <div className="absolute right-4 top-4 flex items-center flex-col gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[100%] transition-all duration-500 delay-150">
                            <HoverAddToWishlistV4 products={product} />
                            <div
                                className="p-2.5 bg-white hover:bg-gray-100 cursor-pointer"
                                onClick={() => openProductPopover()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="icon-quick-view"
                                >
                                    <path
                                        d="M20.7793 13.8746L21.3886 14.312L20.7793 13.8746ZM20.7793 10.1254L20.1701 10.5628L20.7793 10.1254ZM21.6631 12H20.9131H21.6631ZM3.22067 13.8746L3.82993 13.4372L3.22067 13.8746ZM3.22067 10.1254L2.61142 9.68801L3.22067 10.1254ZM2.33691 12H1.58691H2.33691ZM2.61142 14.312C3.47962 15.5214 4.77164 17.1105 6.35173 18.4043C7.92325 19.691 9.85905 20.75 12 20.75V19.25C10.3542 19.25 8.7491 18.4285 7.302 17.2437C5.86349 16.0659 4.6592 14.5923 3.82993 13.4372L2.61142 14.312ZM12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1105 20.5204 15.5214 21.3886 14.312L20.1701 13.4372C19.3408 14.5923 18.1365 16.0659 16.698 17.2437C15.2509 18.4285 13.6458 19.25 12 19.25V20.75ZM21.3886 9.68801C20.5204 8.47865 19.2284 6.88946 17.6483 5.59571C16.0768 4.30899 14.141 3.25 12 3.25V4.75C13.6458 4.75 15.2509 5.57146 16.698 6.75631C18.1365 7.93414 19.3408 9.40765 20.1701 10.5628L21.3886 9.68801ZM12 3.25C9.85905 3.25 7.92325 4.30899 6.35173 5.59572C4.77164 6.88946 3.47962 8.47865 2.61142 9.68801L3.82993 10.5628C4.6592 9.40765 5.86348 7.93414 7.302 6.75631C8.7491 5.57146 10.3542 4.75 12 4.75V3.25ZM21.3886 14.312C21.943 13.5398 22.4131 12.9286 22.4131 12H20.9131C20.9131 12.3585 20.794 12.5681 20.1701 13.4372L21.3886 14.312ZM20.1701 10.5628C20.794 11.4319 20.9131 11.6415 20.9131 12H22.4131C22.4131 11.0714 21.943 10.4602 21.3886 9.68801L20.1701 10.5628ZM3.82993 13.4372C3.20597 12.5681 3.08691 12.3585 3.08691 12H1.58691C1.58691 12.9286 2.05703 13.5398 2.61142 14.312L3.82993 13.4372ZM2.61142 9.68801C2.05703 10.4602 1.58691 11.0714 1.58691 12H3.08691C3.08691 11.6415 3.20597 11.4319 3.82993 10.5628L2.61142 9.68801ZM8.25001 12C8.25001 14.0711 9.92894 15.75 12 15.75V14.25C10.7574 14.25 9.75001 13.2426 9.75001 12H8.25001ZM12 15.75C14.0711 15.75 15.75 14.0711 15.75 12H14.25C14.25 13.2426 13.2426 14.25 12 14.25V15.75ZM15.75 12C15.75 9.92893 14.0711 8.25 12 8.25V9.75C13.2426 9.75 14.25 10.7574 14.25 12H15.75ZM12 8.25C9.92894 8.25 8.25001 9.92893 8.25001 12H9.75001C9.75001 10.7574 10.7574 9.75 12 9.75V8.25Z"
                                        fill="black"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <div className="absolute delay-200 left-0 right-0 bottom-0 p-[12px] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <HoverAddToCartButtonV2
                                products={product}
                                className="w-full text-center px-4"
                            />
                        </div>
                    </div>

                    <div className="mt-4 space-y-1">
                        <h3
                            className="font-normal"
                            onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
                        >
                            {truncateTitle(product?.name, 30)}
                        </h3>
                        <span className="font-semibold">
                            {getProductsPrice({ products: product })}
                        </span>
                    </div>

                    <div className="flex mt-4 gap-2">
                        {product?.media_gallery?.map((item, index) => (
                            <div
                                key={index}
                                className="flex cursor-pointer"
                                onClick={() => setSelectedImage(item?.url)}
                            >
                                <Image
                                    src={item?.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={30}
                                    height={30}
                                    className={`p-1 border ${selectedImage === item?.url ? "border-black" : ""}`}
                                />

                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ProductsPopoverStyleTwo />
        </>
    );
}
