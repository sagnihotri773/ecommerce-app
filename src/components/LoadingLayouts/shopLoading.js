import React from 'react'
import dynamic from 'next/dynamic';
import { AddWishListSvg } from '../SvgFiles/SvgFile';
import ShoppingCart from '../Cart/Cart';
import LogoComponent from '../Common/header/common/LogoComponent';
const Breadcrumbs = dynamic(() => import("@/components/Common/BreadCrumbs/Breadcrumbs"), { ssr: false });

export default function shopLoading() {
  const skeletonLoader = (
    <div className="animate-pulse space-x-4">
      <div className="w-16 h-5 bg-gray-300 rounded"></div>
      <div className="w-16 h-5 bg-gray-300 rounded"></div>
      <div className="w-16 h-5 bg-gray-300 rounded"></div>
      <div className="w-16 h-5 bg-gray-300 rounded"></div>
    </div>
  );
  return (
    <div>
      <header className="absolute w-full transition-all duration-300 ease-in-out z-50">

        <div className={`!bg-white top-0 shadow-lg text-black transition-colors duration-300 ease-in-out`} id={"topnav"}>
          <div className="container mx-auto py-4 flex justify-between items-center md:px-0 px-4">
            <div className='container m-auto  flex' >
              <div className="w-36 h-12 bg-gray-300 animate-pulse rounded-lg" />
            </div>
              <nav className="container mx-auto pt-2 flex space-x-6 text-sm transition-opacity duration-300 ease-in-out opacity-100 hidden md:block text-balck">
                {skeletonLoader}
              </nav>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
              <span className='cursor-pointer'>
                <ShoppingCart size={24} className='cursor-pointer' />
              </span>
              <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white">
                <AddWishListSvg />
              </button>
              <button
                type="button"
                className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>

      </header>
      <Breadcrumbs breadcrumbsData={{}} loading={true} />
      <section className="relative md:py-15 py-10 px-5 mb-4">
        <div className="container m-auto relative">
          <div className={"grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6"}>
            <div className={`lg:col-span-12 md:col-span-8`} >
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse space-y-4 p-4 border border-gray-300 rounded-md"
                  >
                    <div className="h-48 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
