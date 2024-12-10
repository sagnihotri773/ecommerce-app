import React from 'react';
import ladiesWare from '@/assets/Images/ladies-ware.jpg';
import Kids from '@/assets/Images/kids-ware.jpg';
import MensWare from '@/assets/Images/mens-ware.jpg';

export default function banner() {
    return (
        <section className="relative md:pt-20">
            <div className="container-fluid relative">
                <div className="grid md:grid-cols-3">
                    <div className="relative overflow-hidden group">
                        <a className="text-center" href="/shop">
                            <img
                                src={ladiesWare.src}
                                className="group-hover:scale-110 duration-500"
                                alt=""
                            />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-6 rounded-full shadow dark:shadow-gray-800 absolute bottom-4 mx-4 text-lg font-medium">
                                Ladies Wear
                            </span>
                        </a>
                    </div>
                    <div className="relative overflow-hidden group">
                        <a className="text-center" href="/shop">
                            <img
                                src={Kids.src}
                                className="group-hover:scale-110 duration-500"
                                alt=""
                            />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-6 rounded-full shadow dark:shadow-gray-800 absolute bottom-4 mx-4 text-lg font-medium">
                                Kids Wear
                            </span>
                        </a>
                    </div>
                    <div className="relative overflow-hidden group">
                        <a className="text-center" href="/shop">
                            <img
                                src={MensWare.src}
                                className="group-hover:scale-110 duration-500"
                                alt=""
                            />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-6 rounded-full shadow dark:shadow-gray-800 absolute bottom-4 mx-4 text-lg font-medium">
                                Gents Wear
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

    )
}
