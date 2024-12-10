'use client'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePopover } from '@/lib/redux/slices/popOverSlice';
import ProductGalleryTwo  from '../ProductGallery/ProductGalleryTwo';

import dynamic from 'next/dynamic';
const ProductSummaryThree = dynamic(() => import('@/components/Common/ProductSummary/ProductSummaryThree'), { ssr: false });
const GroupedProduct = dynamic(() => import('@/components/Product/GroupedProduct'), { ssr: false });
const BundleProduct = dynamic(() => import('@/components/Product/BundleProduct'), { ssr: false });
const SimpleProduct = dynamic(() => import('@/components/Product/SimpleProduct'), { ssr: false });
const PopoverLayout = dynamic(() => import('@/components/Layout/Popover'), { ssr: false });
const DownloadableProduct = dynamic(() => import('@/components/Product/DownloadableProduct'), { ssr: false });
const ConfigurableProductOptionTwo = dynamic(() => import('../ProductDetail/ConfigurableProductOptionTwo'), { ssr: false });

export default function ProductsPopoverStyleTwo() {
    const dispatch = useDispatch();
    const { openHideLayout, popoverProduct } = useSelector((state) => state.popover);
    const [price, setPrice] = useState('0.00');

    // Mapping product types to their respective components
    const componentMap = {
        SimpleProduct,
        ConfigurableProduct: ConfigurableProductOptionTwo,
        BundleProduct,
        GroupedProduct,
        DownloadableProduct
    };

    useEffect(() => {
        document.body.style.overflow = openHideLayout ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [openHideLayout]);

    // Selecting the component based on the product type
    const ProductTypeComponent = componentMap[popoverProduct?.__typename];

    if (!openHideLayout) return null;

    return (
        <PopoverLayout closeLayout={() => dispatch(closePopover())} openLayout={openHideLayout}>
            <div className="flex justify-center w-full h-full">
                <div className="dropdown-menu absolute px-8 overflow-hidden top-[93px] end-0 m-0 mt-5 z-10 w-full rounded-md dark:bg-slate-900">
                    <div className="flex md:w-[80%] w-full m-auto flex-wrap bg-white p-4 h-[598px] overflow-y-auto">
                        <section className="w-full md:py-18">
                            <div className="container w-full">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <ProductGalleryTwo productsDetails={popoverProduct} />
                                    <div className="sticky">
                                        <ProductSummaryThree data={popoverProduct} price={price} />
                                        {ProductTypeComponent && (
                                            <ProductTypeComponent data={popoverProduct} priceFunction={setPrice} />
                                        )}
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
