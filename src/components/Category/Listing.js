import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ViewProductDetailSvg } from '../SvgFiles/SvgFile';
import { useRouter } from 'next/navigation';
import { openPopover } from '@/lib/redux/slices/popOverSlice';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
const ProductColor = dynamic(() => import('@/components/Product/ProductColor'), { ssr: false });
const HoverAddToWishlist = dynamic(() => import('@/components/Util/Button/HoverAddToWishlist'), { ssr: false });
const HoverAddToCartButton = dynamic(() => import('@/components/Util/Button/HoverAddToCartButton'), { ssr: false });
const ProductsDescription = dynamic(() => import('@/components/Product/Description'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function productListing({ products, handlePopover }) {

const getConfig = (data, type) => {
     const values = data?.find((val) => val?.attribute_code === type )?.values;
     return values
     
}
const dispatch=useDispatch()
const openProductPopover = () => {
    dispatch(openPopover(products));
  };
const router=useRouter()
    return (
        <div className="group relative duration-500 w-full mx-auto mt-2">
            <div className="md:flex items-center mt-2">
                <div className="relative overflow-hidden md:shrink-0 shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                    <Image
                        width={500}
                        height={500}
                        src={products?.image?.url}
                        className="h-full w-full object-cover md:w-48 rounded-md group-hover:scale-110 duration-500 cursor-pointer"
                        alt=""
                        onClick={()=>router.push(`/${products?.url_rewrites?.[0]?.url}`)}
                    />
                    <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                        <li>
                        <HoverAddToWishlist products={products} />
                        </li>
                        <li className="mt-1 ms-0">
                            <span
                                className="size-10 inline-flex items-center cursor-pointer justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                                onClick={() => openProductPopover()}
                            >
                                <ViewProductDetailSvg />
                            </span>
                        </li>
                    </ul>
                    {products?.price_range?.minimum_price?.discount?.percent_off > 0 && (
                        <ul className="list-none absolute top-[10px] start-4">
                            <li>
                                <span
                                    className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5"
                                   
                                >
                                    {products?.price_range?.minimum_price?.discount?.percent_off || 0} Off
                                </span>
                            </li>
                        </ul>
                    )}
                </div>
                <div className="md:ms-6 md:mt-0 ">
                    <Link
                        className="hover:text-primary text-lg font-medium"
                        href={`/${products?.url_rewrites?.[0]?.url}`}
                    >
                        {products.name}
                    </Link>

                    <p className="text-slate-400 md:block hidden">

                        <ProductsDescription description={products?.description} charactersLength={100}/>
                    </p>
                    <p className="mt-2">
                        <Price
                            amount={
                                products?.price_range?.minimum_price?.regular_price?.value
                            }
                        /> </p>
                    <ul className="list-none mt-2">
                      <ProductColor data={getConfig(products?.configurable_options , 'color')} />
                    </ul>
                    <div className="mt-2">
                         <HoverAddToCartButton products={products} />
                    </div>
                    
                </div>
            </div>
        </div>

    )
}
