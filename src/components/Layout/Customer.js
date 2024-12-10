"use client"
import { userAccountMenu } from "@/components/dummy";
import userBanner from "@/assets/Images/userBanner.jpeg";
import { useTranslations } from 'next-intl';
import { logOut, renderHtmlDynamic } from '@/components/Util/commonFunctions';
import { Link } from "@/components/ui/Link";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';
const UserProfileImage = dynamic(() => import('@/components/User/UserProfileImage'), { ssr: false });

export default function CustomerLayout({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const [UserData, setUserData] = useState({});
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setUserData(storeConfigData?.availableStores[0]?.staticContent?.customerAccount);
        }
    }, [storeConfigData?.availableStores]);

    const t = useTranslations("CustomerProfile");

    return (
        <section className="relative pb-16">
            {/* {renderHtmlDynamic(UserData?.topContent)} */}
            <div
                className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${userBanner.src})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div>
            </div>

            <div className="container m-auto py-10 relative md:mt-24 mt-16">
                <div className="md:flex px-4">
                    <div className="lg:w-1/4 md:w-1/3 md:px-3">
                        <div className="relative md:-mt-48 -mt-32">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 z-30">
                                <UserProfileImage />
                                <div className="border-t border-gray-100 dark:border-gray-700">
                                    <ul className="list-none sidebar-nav mb-0 pb-0" id="navmenu-nav">
                                        {userAccountMenu.length > 0
                                            ? userAccountMenu.map((val, index) => (
                                                <li
                                                    className="navbar-item account-menu ms-0"
                                                    key={index}
                                                    onClick={() => val?.title == "Signout" && logOut({ router, dispatch })}
                                                >
                                                    <Link
                                                        className={`navbar-link flex items-center py-2 rounded cursor-pointer ${val.value === pathname
                                                            ? "text-primary"
                                                            : "text-slate-400"
                                                            }`}
                                                        href={val.value || "#"}
                                                        prefetch={true}
                                                        onClick={() => val?.title == "Signout" && logOut({ router, dispatch })}
                                                    >
                                                        {val.icon}
                                                        <h6 className="mb-0 font-medium" >
                                                            {t(val.title)}
                                                        </h6>
                                                    </Link>
                                                </li>
                                            ))
                                            : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                        {children}
                    </div>
                </div>
            </div>
            {/* {renderHtmlDynamic(UserData?.bottomContent)} */}
        </section>
    );
}
