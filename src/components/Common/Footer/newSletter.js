"use client";
import React from "react";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_EMAIL_TO_NEWSLETTER } from "@/lib/graphql/queries/newsLetter";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EmailSvg } from "@/components/SvgFiles/SvgFile";

import dynamic from 'next/dynamic'
import { useTranslations } from "next-intl";
const InputEmail = dynamic(() => import('@/components/Util/Form/email'), { ssr: false });
const SubmitButton = dynamic(() => import('@/components/Util/Button/SubmitButton'), { ssr: false });

export default function newSletter() {
  const [subsScribeEmailToNewsLetter, { loading: newsLetterLoading }] =
    useMutation(SUBSCRIBE_EMAIL_TO_NEWSLETTER);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const t = useTranslations("Newsletter");


  const onSubmit = (data) => {
    subsScribeEmailToNewsLetter({
      variables: {
        email: data?.email,
      },
    })
      .then((res) => {
        toast.success("You have successfully subscribed to the newsletter!");
        reset()
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  return (
    <div className="lg:col-span-3 md:col-span-4 min-h-[300px]">
      <h5 className="tracking-[1px] text-gray-100 font-semibold"> {t("TitleNewsletter")} </h5>
      <p className="mt-6"> {t("NewsletterMessage")} </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1">
          <div className="my-3 min-h-[50px]">
            <div className="form-icon relative mt-2">
              
              <InputEmail
                name="email"
                register={register}
                placeholder="Email"
                errors={errors}
                options={{ required: "This field is required" }}
                label="Write your email"
                isIcon={<EmailSvg />}
              />
            </div>
          </div>

          <SubmitButton title={"Subscribe"} loading={newsLetterLoading} />
        </div>
      </form>
    </div>

  );
}
