'use client'
import Image from 'next/image'
import React from 'react'
import { BoldPhoneSvg, LocationSvg } from '../../SvgFiles/SvgFile';
import { ourStoreUrl } from '@/components/RouteManager';

export default function AddressCard(props) {
    const { country, address, phone, img } = props.AddresArray;

    return (
        <div>
            <Image
                src={img}
                height={476}
                width={600}
                className="rounded-md w-auto shadow-md dark:shadow-gray-800"
                alt=""
            />
            <h5 className="font-semibold text-xl leading-normal my-4">
                {country}
            </h5>
            <p className="text-slate-400">
                {address}
            </p>
            <div className="flex items-center mt-4">
                <BoldPhoneSvg/>
                <div className="">
                    <h5 className="title font-bold mb-0">Phone</h5>
                    <a
                        className="tracking-wide text-primary"
                        href="tel:+152534-468-854"
                    >
                        {phone}
                    </a>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <LocationSvg/>
                <div className="">
                    <h5 className="title font-bold mb-0">Location</h5>
                    <a href={ourStoreUrl}>View on Google map</a>
                </div>
            </div>
        </div>
    )
}
