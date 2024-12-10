"use client"
import { REQUEST_PASSWORD_RESET_EMAIL } from "@/lib/graphql/queries/password";
import { LgButton } from "../Button/Button-lg";
import InputEmail from "./email";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import { forgotPasswordConfirmUrl, loginUrl } from "@/components/RouteManager";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPasswordForm = () => {
  const t = useTranslations("ForgotPassword");

  const [resetPassword, { loading: requestPasswordLoading, error, data }] =
    useMutation(REQUEST_PASSWORD_RESET_EMAIL);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await resetPassword({
        variables: {
          email: data.email,
        },
      });
      if (result) {
        localStorage.setItem("restPasswordEmail", data?.email);
      }
      router.push(forgotPasswordConfirmUrl);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-start lg:py-20 py-8"
    >
      <p className="text-slate-400 mb-6">{t("EnterEmailForPasswordReset")}</p>
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <InputEmail
            label={t("EmailAddress:")}
            name={"email"}
            register={register}
            options={{
              required: t("EmailRequired"),
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address.",
              },
            }}
            labelClassName="font-semibold"
            placeholder={t("EmailPlaceholder")}
            type={"email"}
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <LgButton
            title={t("submit")}
            loading={requestPasswordLoading}
            disable={requestPasswordLoading}
          />
        </div>
        <div className="text-center">
          <span className="text-slate-400 me-2">{t("RememberPassword")} </span>
          <a
            className="text-black dark:text-white font-bold inline-block"
            href={loginUrl}
          >
            {t("SignIn")}
          </a>
        </div>
      </div>
    </form>
  );
};
