"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generateToken, getRoutePath } from "@/components/Util/commonFunctions";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { forgotPasswordUrl, registerUrl } from "@/components/RouteManager";
import { fetchCart } from "@/lib/redux/slices/cartSlice";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import InputEmail from "./email";
import { InputPassword } from "./password";
import { CheckBox } from "./checkbox";
import { LgButton } from "../Button/Button-lg";

export default function LoginForm({ redirect = true , className="lg:py-20 py-8"}) {
  const [isLoading, setIsLoading] = useState(false);
  const toastMessage = "Login Successful";
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("Login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { cart_id } = useSelector((state) => state.customer);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const routePath = getRoutePath();
    try {
      await generateToken(
        data,
        router,
        toastMessage,
        dispatch,
        routePath,
        redirect
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
      if (!redirect) {
        dispatch(fetchCart(cart_id));
        dispatch(fetchCustomerData(1));
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`text-start ${className}`}
    >
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <InputEmail
            name="email"
            register={register}
            placeholder={t("EmailPlaceholder")}
            errors={errors}
            options={{
              required: t("EmailRequired"),
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address.",
              },
            }}
            label={t("Email_Address")}
          />
        </div>
        <div className="mb-4">
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
        <div className="flex justify-between mb-4">
          <CheckBox
            // register={register}
            options={{ required: t("FieldRequired") }}
            name="RememberMe"
            label="RememberMe"
            labelClassName="form-check-label text-slate-400"
            labelText={t("Remember_me")}
            type="checkbox"
            errors={errors}
          />

          <p className="text-slate-400 mb-0 cursor-pointer">
            <a className="text-slate-400" href={forgotPasswordUrl}>
              {t("Forgot_Password")}
            </a>
          </p>
        </div>
        <div className="mb-4">
          <LgButton
            title={t("Submit")}
            disable={isLoading}
            loading={isLoading}
          />
        </div>
        <div className="text-center">
          <span className="text-slate-400 me-2">{t("NoAccount")}</span>{" "}
          <Link
            className="text-black dark:text-white font-bold inline-block"
            href={registerUrl}
            prefetch={true}
          >
            {t("Sign_Up")}
          </Link>
        </div>
      </div>
    </form>
  );
}
