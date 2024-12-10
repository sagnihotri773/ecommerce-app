"use client";
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/Util/Button/SubmitButton";
import GetCustomAtrribute from "@/components/Util/commonFunctions";
import { useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER_PHONE } from "@/lib/graphql/queries/customer";
import { PhoneInput } from "react-international-phone";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
export default function ContactInfoForm() {
  const formSchema = z.object({
    phone_number: z
      .string()
      .min(10, { message: "Invalid phone number format" }),
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  const t = useTranslations("UpdateCustomerDetail");
  const { data } = useSelector((state) => state.customerData);

  const [phone_number, setPhone_number] = useState();

  const [updateCustomerPhone, { loading: cudtomerPhoneLoading }] = useMutation(
    UPDATE_CUSTOMER_PHONE
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    setPhone_number(
      GetCustomAtrribute({ custData: data?.customer, code: "phone_number" })
    );
  }, [data]);
  const dispatch = useDispatch();
  const onSubmit = () => {
    updateCustomerPhone({
      variables: {
        phone_number: phone_number,
      },
      onCompleted: (res) => {
        dispatch(fetchCustomerData(1));
        toast.success(t("MobileUpdateMessage"));
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <FormField
              control={methods.control}
              name="phone_number"
              className=""
              render={({ field }) => (
                <FormItem className="space-y-0  mx-auto contactUS">
                  <FormLabel className="font-bold">
                    {t("PhoneNo")}
                    
                  </FormLabel>
                  <FormControl className="pt-2">
                    <PhoneInput
                      value={phone_number}
                      onChange={(value) => {
                        setPhone_number(value);
                        field.onChange(value);
                      }}
                      className="mt-2 "
                      placeholder="Phone Number"
                      countrySelectorStyleProps={{
                        buttonClassName: "!h-full  ",
                        buttonStyle: { width: "45px", height: "100%" },
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1">
                    {errors.phone_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />


          </div>
        </div>

        <SubmitButton title={t("Add")} loading={cudtomerPhoneLoading} />
      </form>
    </FormProvider>
  );
}
