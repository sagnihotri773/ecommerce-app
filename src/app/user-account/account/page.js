import ContactInfoForm from "@/components/User/ContactInfoForm";
import { useTranslations } from "next-intl";
import { UpdateCustomerDetailForm } from "@/components/Util/Form/UpdateCustomerDetailForm";
export async function generateMetadata({ params }) {
  return {
    title: "Account",
  };
}
export default function page() {
  const t = useTranslations("UpdateCustomerDetail");


  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">{t("PersonalDetail")}</h5>
      <UpdateCustomerDetailForm  />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <div>
          <h5 className="text-lg font-semibold mb-4">{t("ContactInfo")}</h5>
          <ContactInfoForm  />
        </div>
      </div>
    </div>
  );
}
