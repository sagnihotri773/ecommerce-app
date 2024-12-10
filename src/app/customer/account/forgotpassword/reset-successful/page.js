import { loginUrl } from "@/components/RouteManager/index";
import { ResetSuccessfullSvg } from "@/components/SvgFiles/SvgFile";
import { SmButton } from "@/components/Util/Button/Button-sm";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";

export async function generateMetadata({ params }) {
  return {
    title: "Password Reset Successful",
  };
}

export default function ResetSuccessFul() {
  const t = useTranslations("ResetSuccessFul");
    return (
    <div className="flex items-center justify-center h-screen">
      <div className="mt-0 text-center h-[auto]">
        <h1
          className={
            "text-[40px] text-[#00C0F3] font-bold text-center  "
          }
        >
          {t("passwordResetSuccess")}
        </h1>
        <div className="mt-[18px]">
          <p className="text-xl text-[#545454]">
            {t("passwordChangeSuccessMessage")}
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <ResetSuccessfullSvg />
        </div>
        <Link href={loginUrl} prefetch={true}>
          <SmButton title={"Login"}  />
        </Link>
      </div>
    </div>
  );
}
