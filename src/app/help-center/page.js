"use client";
import { homeUrl } from "@/components/RouteManager/index";
import helpCenter from "@/assets/Images/helpCenter.jpg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/Util/Button/SubmitButton";
import RoundedInput from "@/components/Util/Form/input-rounded";
import { useEffect, useState } from "react";
import { descriptionRender } from '@/components/Util/commonFunctions';
import { fetchRouteData } from "@/server/productDetails";
import { HelpCenterQuestion } from "@/components/HelpCenter/HelpCenter";
import { useTranslations } from "next-intl";

export default function HelpCenter() {
  const [helpCenterContent, setHelpCenterContent] = useState('');
  const t = useTranslations("HelpCenter");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetchRouteData("help-center");
      setHelpCenterContent(data?.route?.content);
    }
    fetchContent();
  }, [])

  const onSubmit=(e)=>{
e.preventDefault()
  }


  return (
    <div>
      <section
        className="relative table w-full py-36 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${helpCenter.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-80" />
        <div className="container relative !max-w-full">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="mb-6 text-4xl leading-normal tracking-wider font-semibold text-white">
            {t("Hello")} <br /> {t("HelpYou")}
            </h3>
            <div className="text-center subscribe-form mt-4 pt-2">
              <form className="relative mx-auto max-w-xl" onSubmit={onSubmit}>
                <RoundedInput
                  id="help"
                  register={register}
                  errors={errors}
                  options={{ required: "This field require" }}
                  name="helpCenter"
                  placeholder="Search your questions or topic..."
                />

                <SubmitButton
                  className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-primary text-white rounded-full"
                  title="Search"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <a href={homeUrl}>Cartzio</a>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right" />
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              {t("Helpcenter")}
            </li>
          </ul>
        </div>
      </section>
      <HelpCenterQuestion />

      <div
        dangerouslySetInnerHTML={{
          __html: descriptionRender(
            helpCenterContent
          ),
        }}
        className="mt-18"
      />
    </div>
  );
}
