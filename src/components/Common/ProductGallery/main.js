"use client";
import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// Import dynamic components
// const ProductGalleryOne = dynamic(() => import('./ProductGalleryOne'), { ssr: false });
// const ProductGalleryTwo = dynamic(() => import('./ProductGalleryTwo'), { ssr: false });
// const ProductGalleryThree = dynamic(() => import('./ProductGalleryThree'), { ssr: false });
// const ProductGalleryFour = dynamic(() => import('./ProductGalleryFour'), { ssr: false });
// const ProductGalleryFive = dynamic(() => import('./ProductGalleryFive'), { ssr: false });
const ProductGallerySix = dynamic(() => import('./ProductGallerySix'), { ssr: false });


// const cartDrawerComponents = {
//     ProductGalleryOne,
//     ProductGalleryTwo,
//     ProductGalleryThree,
//     ProductGalleryFour,
//     ProductGalleryFive,
//     ProductGallerySix
// };

export default function ProductGallery(props) {
    // const [gallery, setGallery] = useState(null); 
    // const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    // useEffect(() => {
    //     if (storeConfigData?.availableStores) {
    //         setGallery(storeConfigData?.availableStores[0]?.layoutSetting?.product_gallery || "ProductGalleryOne");
           
    //     }
    // }, [storeConfigData?.availableStores]);

    // const SelectedGallery = cartDrawerComponents[gallery] || ProductGalleryOne;

    return (
        <>
            {/* {loading ? (
                <div className="w-full p-4">
                    <div className="animate-pulse">
                        <div className="h-[600px] w-full  bg-gray-300 rounded-md mb-4"></div>
                    </div>
                </div>
            ) : (
                // Display the selected gallery once loading is done
            )} */}
            <ProductGallerySix {...props}/>
        </>
    );
}
