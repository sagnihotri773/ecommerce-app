import { useTranslations } from "next-intl";
import { EmptyCartSvg } from "@/components/SvgFiles/SvgFile";
import { shopUrl } from "@/components/RouteManager";
import { useRouter } from "next/navigation";

export const EmptyCart = () => {
  const router=useRouter()
  const t = useTranslations("ShoppingCart");
  return (
    <div>

    <div className="flex flex-col  items-center">
      <EmptyCartSvg />
      <p>{t("CartEmpty")}</p>
      <div className="text-center py-7" onClick={() => router.push(shopUrl)}>
        <button className="border border-[#00C0F3] rounded-[50px] bg-primary text-white px-9 py-2 text-xl font-bold">
          {t("ContinueShopping")}
        </button>
      </div>
    </div>
    </div>
  );
};
