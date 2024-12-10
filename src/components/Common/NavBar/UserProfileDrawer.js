"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/components/Util/commonFunctions";
import {
  helpCenterUrl,
  userAccountUrl,
  userSettingUrl,
} from "@/components/RouteManager";
import {
  HelpCenterSvg,
  LogOutSvg,
  SettingsSvg,
  UserAccountsvg,
} from "@/components/SvgFiles/SvgFile";
import { closeDrawer } from "@/lib/redux/slices/drawerSlice";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import('@/components/Util/Form/LoginForm'), { ssr: false });
const Drawer = dynamic(() => import('../DrawerLayout/Drawer'), { ssr: false });


export default function UserModel() {
// export default function UserProfileDrawer() {
  const router = useRouter();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data: customerData } = useSelector((state) => state.customerData);

  const t = useTranslations("CustomerProfile");
  const login = useTranslations("Login");

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <>
      {token ? (
        <Drawer>
          <div className="px-4 py-6 sm:px-6 w-[300px]">
            <p className="text-slate-400 pt-2 ">
              {t("Welcome")} {customerData?.customer?.firstname}{" "}
              {customerData?.customer?.lastname}
            </p>
            <ul className="py-2 text-start" onClick={() => handleCloseDrawer()}>
              <li>
                <Link href={userAccountUrl} prefetch={true}>
                  <span className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary">
                    <UserAccountsvg />
                    {t("Account")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href={helpCenterUrl} prefetch={true}>
                  <span className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary">
                    <HelpCenterSvg />
                    {t("Helpcenter")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href={userSettingUrl} prefetch={true}>
                  <span className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary">
                    <SettingsSvg />
                    {t("Settings")}
                  </span>
                </Link>
              </li>
              <li className="border-t border-gray-100 my-2" />
              <li>
                <button
                  className="flex items-center font-medium py-2 px-4 text-gray-800 hover:text-primary"
                  onClick={(e) => logOut({ router, dispatch })}
                >
                  <LogOutSvg />
                  {t("Logout")}
                </button>
              </li>
            </ul>
          </div>
        </Drawer>
      ) : (
        <Drawer>
          <div className="px-4 py-6 ">
            <h2 className="text-center  text-bold ">{login("Login")}</h2>
            <LoginForm redirect={false} />
          </div>
        </Drawer>
      )}
    </>
  );
}
