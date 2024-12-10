"use client"
import React from 'react';
import BgShapeSale from '@/assets/Images/bg-shape-sale.png';
import BoyImg from '../../assets/Images/hero1Boy.png'

export default function EndOFSaleOutlet() {
    return (
        <div className="container m-auto relative md:mt-24 mt-16">
            <div className="grid grid-cols-1">
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 py-20 px-4 md:px-10 bg-orange-600 bg-no-repeat bg-cover " style={{ backgroundImage: `url(${BoyImg.src})`}}>
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url(${BgShapeSale.src})` }}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 items-end gap-6 relative z-10">
                        <h3 className="text-4xl leading-normal tracking-wide font-bold text-white">
                            Sale Outlet <br /> Up to 75% Off
                        </h3>
                        <div className="md:text-end">
                            <a
                                className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-white text-primary rounded-md"
                                href="/sale"
                            >
                                Offer Grab Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
