import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  return {
    title: "Confirm Email - Password Reset Instructions",
  };
}

export default function ConfirmEmail() {
  const t = useTranslations("ConfirmEmail");

  return (
    <>
      {/* <div className="absolute inset-0 h-[250px] bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div> */}
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-screen-lg w-full p-4 text-center">
          <h1 className="lg:text-4xl text-2xl text-[#00C0F3] font-bold mb-4">
            {t("accountCheckMessage")}
          </h1>
          <div className="mt-5">{t("passwordResetEmailMessage")}</div>
        </div>
      </div>
    </>
  );
}
