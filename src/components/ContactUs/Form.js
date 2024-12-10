"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { CONTACT_US } from "@/lib/graphql/queries/contactUs";
import { FormProvider, useForm } from "react-hook-form";
import GetCustomAtrribute, { renderHtmlDynamic } from "@/components/Util/commonFunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import contactUsImage from "@/assets/Images/contactUS.png";
import { useSelector } from "react-redux";
import { InputText } from "../Util/Form/input";
import InputEmail from "../Util/Form/email";
import dynamic from 'next/dynamic'
const TextArea = dynamic(() => import('../Util/Form/textArea'), { ssr: false });
const SubmitButton = dynamic(() => import('@/components/Util/Button/SubmitButton'), { ssr: false })

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactUs, { loading: contactUsLoading }] = useMutation(CONTACT_US);
  const { data: customeData } = useSelector((state) => state.customerData);
  const [contactUsData, setContactUsData] = useState({});
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setContactUsData(storeConfigData?.availableStores?.[0]?.staticContent?.contactUs);
    }
  }, [storeConfigData?.availableStores])
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    question: z.string().min(1, { message: "Question is required" }),
    phone_number: z
      .string()
      .min(10, { message: "Invalid phone number format" }),
    comment: z.string().min(1, { message: "Comment is required" }),
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
      name: "",
      email: "",
      question: "",
      comment: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const phone_number = GetCustomAtrribute({
    custData: customeData?.customer,
    code: "phone_number",
  });

  useEffect(() => {
    setPhoneNumber(phone_number);
  }, [phone_number]);

  const onSubmit = async (data) => {
    if (phoneNumber) {
      try {
        const result = await contactUs({
          variables: {
            email: data.email,
            name: data.name,
            comment: data.comment,
            telephone: phoneNumber,
          },
          onCompleted: (res) => {
            reset();
            setPhoneNumber("");
            toast.success(
              "Your message has been sent successfully! We will get back to you soon."
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
      } catch (error) {
        toast.error(
          error?.message || "An error occurred while sending your message."
        );
      }
    } else {
      toast.info("Please add your phone number first.");
    }
  };

  return (
    <>
      {/* {renderHtmlDynamic(contactUsData?.topContent)} */}


      <div className="container m-auto">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
          <div className="lg:col-span-7 md:col-span-6">
            <Image
              src={contactUsImage}
              className="object-none"
              alt=""
              height={643}
              width={643}
            />
          </div>
          <div className="lg:col-span-5 md:col-span-6">
            <div className="lg:ms-5">
              <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                <h3 className="mb-6 text-2xl leading-normal font-semibold">
                  {t('GetTouch')}
                </h3>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                      <div className="lg:col-span-6">
                        <InputText
                          label="Your Name:"
                          name="name"
                          type="text"
                          register={register}
                          placeholder="Name:"
                          errors={errors}
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <InputEmail
                          register={register}
                          errors={errors}
                          label="Your Email:"
                          name="email"
                          type="email"
                          placeholder="Email:"
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <InputText
                          register={register}
                          errors={errors}
                          label="Your Question:"
                          name="question"
                          placeholder="Subject:"
                        />
                      </div>
                      <FormField
                        control={methods.control}
                        name="phone_number"
                        className=""
                        render={({ field }) => (
                          <FormItem className="space-y-0  mx-auto contactUS">
                            <FormControl>
                              <PhoneInput
                                value={phoneNumber}
                                onChange={(value) => {
                                  setPhoneNumber(value);
                                  field.onChange(value);
                                }}
                                className="mt-2 pl-2 "
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
                      <div className="lg:col-span-12">
                        <TextArea
                          register={register}
                          errors={errors}
                          label="Your Comment:"
                          name="comment"
                          placeholder="Message:"
                          className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                        />
                      </div>
                    </div>
                    <SubmitButton
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-2"
                      title="Send Message"
                      loading={contactUsLoading}
                    />
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {renderHtmlDynamic(contactUsData?.bottomContent)} */}
    </>

  );
}
