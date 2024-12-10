"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/Util/Button/SubmitButton";
import { useState } from "react";
import { client } from "@/lib/graphql/apolloClient";
import { GET_GUEST_ORDER_DETAIL } from "@/lib/graphql/queries/checkout";
import ViewOrder from "@/app/viewOrder/[id]/page";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { InputText } from "@/components/Util/Form/input";
import InputEmail from "@/components/Util/Form/email";
import "react-toastify/dist/ReactToastify.css";

export default function GuestUserOrderTracking() {
  const t = useTranslations("GuestOrderInfo")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [guestOrderData, setGuestOrderData] = useState();
  const [loading,setLoading]=useState(false)
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { data: fetchedData } = await client.query({
        query: GET_GUEST_ORDER_DETAIL,
        variables: {
          email: data?.email,
          number: data?.OrderID,
          postcode: data?.postCode,
        },
        fetchPolicy: "no-cache",
      });

      setGuestOrderData(fetchedData);
      return fetchedData;
    } catch (error) {
      setLoading(false)
      toast.error(error?.message);
    }
  };

  return (
    <div>
      {guestOrderData?.guestOrder ? (
        <ViewOrder guestOrderData={guestOrderData} />
      ) : (
        <>
      {/* <div className="absolute inset-0 h-[250px] bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div> */}
        
        
        <div className="container m-auto mt-4">
          <div className=" flex justify-center py-7 overflow-hidden rounded-md bg-white dark:bg-slate-900">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 px-[10px]">
            <h2 className="text-[25px] bold text-start mb-5">{t("GuestOrderInformation")}</h2>
              <div className="py-2">
                <InputText
                  register={register}
                  errors={errors}
                  type="number"
                  label={t("OrderId")}
                  placeholder="Order Id"
                  name="OrderID"
                  options={{ required: t("RequiredField") }}
                />
              </div>
              <div>
                <InputEmail
                  register={register}
                  type="email"
                  errors={errors}
                  label={t("Email")}
                  options={{ required: t("RequiredField") }}
                  name="email"
                />
              </div>
              <div className="py-2">
                <InputText
                  register={register}
                  type="number"
                  errors={errors}
                  label={t("PostCode")}
                  options={{ required: t("RequiredField") }}
                  name="postCode"
                  placeholder="Billing Post Code"
                />
              </div>
              <div className="m-auto flex justify-center">
                <SubmitButton title={t("Continue")} loading={loading} disabled={loading}/>
              </div>
            </form>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
