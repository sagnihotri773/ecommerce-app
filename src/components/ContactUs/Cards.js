import Link from 'next/link'
import React from 'react'

export default function ContactUsCards({ description = '', contact = '', icon = '', type="" }) {
    return (
        <div className="text-center px-6">
            <div className="relative text-transparent">
                <div className="size-20 bg-orange-500/5 text-primary rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                    {icon}
                </div>
            </div>
            <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold"> {type} </h5>
                <p className="text-slate-400 mt-3 h-12">
                    {description}
                </p>
                <div className="mt-5">
                    <Link
                        className="text-primary font-medium"
                        href="tel:+152534-468-854"
                    >
                        {contact}
                    </Link>
                </div>
            </div>
        </div>
    )
}
