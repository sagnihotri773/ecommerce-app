'use client'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePopover } from '@/lib/redux/slices/popOverSlice';

import dynamic from "next/dynamic";
const PopoverLayout = dynamic(() => import('@/components/Layout/Popover'), { ssr: false });
const ProductImage = dynamic(() => import('@/components/Common/ProductGallery/ProductGalleryFive'), { ssr: false });
const ProductNameRatingOverView = dynamic(() => import('@/components/Common/ProductSummary/ProductSummaryOne'), { ssr: false });
const SimpleProduct = dynamic(() => import('@/components/Product/SimpleProduct'), { ssr: false });
const ConfigurableProduct = dynamic(() => import('@/components/Product/ConfigurableProduct'), { ssr: false });
const BundleProduct = dynamic(() => import('@/components/Product/BundleProduct'), { ssr: false });
const GroupedProduct = dynamic(() => import('@/components/Product/GroupedProduct'), { ssr: false });
const DownloadableProduct = dynamic(() => import('@/components/Product/DownloadableProduct'), { ssr: false });

export default function ProductsPopover() {
    const dispatch = useDispatch();
    const { openHideLayout, popoverProduct } = useSelector((state) => state.popover);
    const [price, setPrice] = useState('0.00');

    const componentMap = {
        SimpleProduct: SimpleProduct,
        ConfigurableProduct: ConfigurableProduct,
        BundleProduct: BundleProduct,
        GroupedProduct: GroupedProduct,
        DownloadableProduct: DownloadableProduct,
    };

    useEffect(() => {
        if (openHideLayout) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openHideLayout]);


    const ProductTypeComponent = componentMap[popoverProduct?.__typename];

    if (!openHideLayout) return null;

    return (
        <PopoverLayout closeLayout={() => dispatch(closePopover())} openLayout={openHideLayout}>
            <div className="flex justify-center w-full h-full">
                <div className="dropdown-menu absolute px-8 overflow-hidden top-[93px] end-0 m-0 mt-5 z-10 w-full rounded-md dark:bg-slate-900 ">
                    <div className="flex w-[80%] m-auto flex-wrap bg-white p-4 h-[598px] overflow-y-auto ">
                        <section className="relative md:py-18">
                            <div className="container m-auto relative">
                                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                                    <ProductImage data={popoverProduct} />
                                    <div className="lg:col-span-7">
                                        <div className="sticky top-20">
                                            <ProductNameRatingOverView data={popoverProduct} price={price} />
                                            {ProductTypeComponent ?
                                                <ProductTypeComponent data={popoverProduct} priceFunction={setPrice} />
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PopoverLayout>
    );
}
