import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux';
import DummyUser from "@/assets/Images/DummyUser.png"
export default function UserProfileImage() {
    const { data: customerData } = useSelector((state) => state.customerData);

    const { firstname, lastname, email } = customerData?.customer || {};
    return (
        <div className="profile-pic text-center mb-5">
            
            <div>
                <div className="relative h-28 w-28 mx-auto">
                    <Image
                        width={112}
                        height={112}
                        src={DummyUser?.src}
                        className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                        id="profile-image"
                        alt=""
                    />
                    <label
                        className="absolute inset-0 cursor-pointer"
                        htmlFor="pro-img"
                    />
                </div>
                <div className="mt-4">
                    <h5 className="text-lg font-semibold">{firstname} {lastname}</h5>
                    <p className="text-slate-400">{email}</p>
                </div>
            </div>
        </div>
    )
}
