import React from 'react';
import { Link } from "@/components/ui/Link";
import Man from '@/assets/Images/mens-ware.jpg';
import Image from 'next/image';

export default function category({ categories }) {

    const getImg = (img) => {
        return ![null, undefined, ''].includes(img) ? img : Man
    }
    return (
        <div className="container m-auto relative mt-6">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 p-4 gap-6">
                {categories?.map((val, index) => (
                    <div className="relative overflow-hidden group rounded-md shadow dark:shadow-slate-800">
                        <Link className="text-center" href={`/${val.url}`} key={index} prefetch={true}>
                            <Image
                                src={getImg(val.image)}
                                className="group-hover:scale-110 duration-500 md:min-h-[290px] md:min-w-[290px] w-auto h-auto"
                                alt=""
                                objectFit="cover"
                                height={0}
                                width={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-primary py-2 px-6 rounded-full shadow dark:shadow-gray-800 absolute bottom-4 mx-4 text-lg font-medium">
                                {val.name}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
