'use client'
import React, { useState } from 'react'
import { getProductsPrice, truncateTitle } from '../Util/commonFunctions';
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function MobileProductsLayout({ product = {} }) {
    const [selectedImage, setSelectedImage] = useState(product?.image?.url);
    const router = useRouter();

    return (
        <div key={product.id} className="border rounded-lg overflow-hidden cursor-pointer" >
            <div className="relative" onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}>
                <div className="relative w-full h-[200px]">  {/* Fixed height container */}
                    <Image
                        src={selectedImage}
                        alt={product.name}
                        layout="fill"  // Makes the image fill the container
                        className="object-cover cursor-pointer" // Ensures image covers the container without distortion
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // Responsive sizing
                        loading="lazy"
                    />
                </div>
                {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-normal">
                        {product.discount}
                    </span>
                )}
            </div>

            <div className="p-4 cursor-pointer">
                <h3 className="font-normal text-lg mb-2 truncate w-full">{truncateTitle(product?.name, 25)}</h3>

                <div className="flex items-center justify-between" onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}>
                    <div>
                        <span className="font-semibold">{getProductsPrice({ products: product })}</span>

                    </div>
                </div>
                <div className="flex mt-4 gap-2">
                    {product?.media_gallery?.slice(0, 3).map((item, index) => (
                        <div
                            key={index}
                            className="flex cursor-pointer"
                            onClick={() => setSelectedImage(item?.url)} // Set selected image on click
                        >
                            <Image
                                src={item?.url}
                                alt={`Thumbnail ${index + 1}`}
                                width={24}  // Use appropriate width for your thumbnail images
                                height={24} // Use appropriate height for your thumbnail images
                                className={`w-[24px] h-[24px] border ${selectedImage === item?.url ? "border-black" : ""}`}
                                loading="lazy" // Ensure lazy loading
                            />
                            {/* <img
                                src={item?.url}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-[24px] h-[24px] border ${selectedImage === item?.url ? "border-black" : ""
                                    }`}
                            /> */}
                        </div>
                    ))}
                    {product?.media_gallery?.length > 4 && (
                        <div className="flex items-center justify-center w-[24px] h-[24px] border bg-gray-200 text-sm font-bold cursor-pointer" onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}>
                            +{product?.media_gallery?.length - 4}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
