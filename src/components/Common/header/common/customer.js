import React from 'react'
import { logOut } from '@/components/Util/commonFunctions'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Link } from "@/components/ui/Link";
import { HelpCenterSvg, LogOutSvg, SettingsSvg, UserAccountsvg } from '@/components/SvgFiles/SvgFile';
// import LoginForm from '@/components/Util/Form/LoginForm';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { helpCenterUrl, userAccountUrl, userSettingUrl } from '@/components/RouteManager';
import dynamic from 'next/dynamic';
const LoginForm = dynamic(() => import('@/components/Util/Form/LoginForm').then((mod) => mod.default), { ssr: true });


export default function customer({ }) {
    const router = useRouter();
    const token = Cookies.get("token");
    const login = useTranslations("Login");
    const t = useTranslations("CustomerProfile");
    const dispatch = useDispatch();
 

    const userMenuOptions = [
        { title: t("Account"), link: userAccountUrl, icon: <UserAccountsvg /> },
        { title: t("Helpcenter"), link: helpCenterUrl, icon: <HelpCenterSvg /> },
        { title: t("Settings"), link: userSettingUrl, icon: <SettingsSvg /> },
        { title: t("Logout"), link: '', icon: <LogOutSvg /> },
    ]

    return (
        <>
            {token ?
                <div className="py-6 sm:px-6">
                    <ul className="text-start">
                        {userMenuOptions?.map((val) => (
                            <li>
                                {val.link ? <Link href={val.link} prefetch={true}>
                                    <span className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary">
                                        {val.icon} {val.title}
                                    </span>
                                </Link> :
                                    <button
                                        className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary"
                                        onClick={(e) => logOut({ router, dispatch })}
                                    >
                                        <LogOutSvg />
                                        {t("Logout")}
                                    </button>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <div className="px-4 py-6 ">
                    <h2 className="text-center  text-bold ">{login("Login")}</h2>
                    <LoginForm redirect={false} />
                </div>}
        </>
    )
}
