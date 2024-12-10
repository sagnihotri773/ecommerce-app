"use client";
import { useTranslations } from "next-intl";
import { CheckBox } from "./checkbox";
import { InputText } from "./input";
import { InputPassword } from "./password";
import { FormProvider, useForm } from "react-hook-form";
import { generateToken, getRoutePath } from "@/components/Util/commonFunctions";
import { useDispatch } from "react-redux";
import { createDynamicData } from "@/components/Util/commonGraphQuery";
import { CREATE_USER } from "@/lib/graphql/queries/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputEmail from "./email";
import { LgButton } from "../Button/Button-lg";
import { loginUrl } from "@/components/RouteManager";

export default function RegisterForm () {
  const toastMessage = "Registration Successful"

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const methods = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const createUserData = await createDynamicData(CREATE_USER, data);
    const routePath = getRoutePath();

    if (!createUserData?.message) {
      generateToken(data, router, toastMessage, dispatch, routePath, true);
    } else {
      setIsLoading(false);
    }
  };

  const t = useTranslations("Register");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-start lg:py-20 py-8 xl:max-h-[701px]"
      >
        <div className="grid grid-cols-1">
          <div className="mb-4 min-h-[72px]">
            <InputText
              register={register}
              name="firstname"
              placeholder={t("Harry")}
              options={{ required: t("FirstNameRequired") }}
              errors={errors}
              label={t("FirstName:")}
            />
          </div>
          <div className="mb-4 min-h-[72px]">
            <InputText
              register={register}
              name="lastname"
              placeholder="John"
              options={{ required: t("LastNameRequired") }}
              errors={errors}
              label={t("LastName:")}
            />
          </div>
          <div className="mb-4 min-h-[72px]">
            <InputEmail
              name="email"
              register={register}
              errors={errors}
              options={{
                required: t("EmailRequired"),
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              }}
              label={t("EmailAddress")}
            />
          </div>
          <div className="mb-4 min-h-[72px]">
            <InputPassword
              name="password"
              register={register}
              placeholder={t("Password:")}
              errors={errors}
              options={{
                required: t("PasswordRequired"),
                minLength: {
                  value: 8,
                  message: t("PasswordMinLength"),
                },
              }}
              label={t("Password:")}
            />
          </div>
          <div className="mb-4 min-h-[62px]">
            <div className="flex items-center w-full mb-0">
              <CheckBox
                register={register}
                options={{ required: t("FieldRequired") }}
                name="termsCondition"
                label="AcceptT&C"
                labelText={t("IAccept")}
                termsText={t("TermsCondition")}
                errors={errors}
              />
            </div>
          </div>
          <div className="mb-4">
            <LgButton
              disable={isLoading}
              loading={isLoading}
              title={t("Register")}
            />
          </div>

          <div className="text-center">
            <span className="text-slate-400 me-2">
              {t("AlreadyHaveAccount")}{" "}
            </span>{" "}
            <a
              className="text-black dark:text-white font-bold inline-block"
              href={loginUrl}
            >
              {t("Sign_In")}
            </a>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
