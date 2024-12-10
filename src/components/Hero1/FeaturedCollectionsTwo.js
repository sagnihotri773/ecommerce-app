import React from 'react';
import ladiesWare from '@/assets/Images/ladies-ware.jpg';
import Chappal from '@/assets/Images/chappal-shoes.jpg';
import Sunglasses from '@/assets/Images/sunglasses.jpg';
import MensWare from '@/assets/Images/mens-ware.jpg';

export default function FeaturedCollections({ categories }) {
    return (
        <section className="relative md:pb-24">
            <div className="container m-auto relative">
                <div className="grid grid-cols-1 justify-center text-center mb-6">
                    <h5 className="font-semibold text-3xl leading-normal mb-4">
                        Featured Collections
                    </h5>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Shop the latest products from the most popular collections
                    </p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 pt-6 gap-6 min-h-[350px]">
                    <div className="lg:col-span-4 md:col-span-6 md:order-1 order-2">
                        <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800 h-full">
                            <a className="block h-full" href="/index-fashion-two">
                                <img
                                    src={ladiesWare.src}
                                    className="h-full w-full object-cover rounded-md group-hover:scale-110 duration-500"
                                    alt=""
                                />
                                <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">
                                    Ladies Wear
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-12 lg:order-2 order-3">
                        <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800 h-full">
                                <a className="block h-full" href="/index-fashion-two">
                                    <img
                                        src={Chappal.src}
                                        className="h-full w-full object-cover rounded-md group-hover:scale-110 duration-500"
                                        alt=""
                                    />
                                    <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">
                                        Chappal & Shoes
                                    </span>
                                </a>
                            </div>
                            <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800 h-full">
                                <a className="block h-full" href="/index-fashion-two">
                                    <img
                                        src={Sunglasses.src}
                                        className="h-full w-full object-cover rounded-md group-hover:scale-110 duration-500"
                                        alt=""
                                    />
                                    <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">
                                        Sunglasses
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 lg:order-3 order-2">
                        <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800 h-full">
                            <a className="block h-full" href="/index-fashion-two">
                                <img
                                    src={MensWare.src}
                                    className="h-full w-full object-cover rounded-md group-hover:scale-110 duration-500"
                                    alt=""
                                />
                                <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">
                                    Mens Wear
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
