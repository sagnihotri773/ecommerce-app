"use client"
import { homeUrl } from "@/components/RouteManager";
import { selectStoreInfo } from "@/lib/redux/slices/storeConfig";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const StoreLogo = () => {
    const storeLogoUrl = useSelector((state) => selectStoreInfo(state, "logo"));
    const router=useRouter()
    return (
        <img
            src={storeLogoUrl}
            className="w-[80px] h-[16px] mx-auto block cursor-pointer"
            alt=""
            onClick={()=>router.push(homeUrl)}
        />
    )
}