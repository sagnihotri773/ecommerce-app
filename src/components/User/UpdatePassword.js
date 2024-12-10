"use client";
import React from "react";
import AccountDelete from "./AccountDelete";
import { useTranslations } from "next-intl";
import { PasswordSvg } from "../SvgFiles/SvgFile";
import SubmitButton from "../Util/Button/SubmitButton";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD_MUTATION } from "@/lib/graphql/queries/password";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputPassword } from "../Util/Form/password";
import "react-toastify/dist/ReactToastify.css";

export default function UpdatePassword() {
  const t = useTranslations("UpdatePassword");
  
  const [changeCustomerPassword, { loading: customerPasswordLoading }] =
    useMutation(CHANGE_PASSWORD_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    changeCustomerPassword({
      variables: {
        currentPassword: data?.password,
        newPassword: data?.newPassword,
      },
    })
      .then((res) => {
        reset();
        toast.success(t("passwordUpdateSuccess"));
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const password = watch("newPassword");
  return (
    <>
      <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
          <div>
            <h5 className="text-lg font-semibold mb-4">
              {t("ChangePassword")}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="form-icon relative mt-2">
                    
                    <InputPassword
                      name="password"
                      type="password"
                      register={register}
                      placeholder={t("OldPassword")}
                      errors={errors}
                      options={{ required: t("RequiredOldPassword") }}
                      label={t("OldPassword")}
                      eyeIconClassName="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer hover:opacity-70"
                      labelClassName={"font-semibold"}
                      isIcon={<PasswordSvg />}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-icon relative mt-2">
                    <InputPassword
                      name="newPassword"
                      type="password"
                      register={register}
                      placeholder={t("NewPassword")}
                      errors={errors}
                      options={{ required: t("RequiredNewPassword") }}
                      label={t("NewPassword")}
                      eyeIconClassName="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer hover:opacity-70"
                      labelClassName={"font-semibold"}
                      isIcon={<PasswordSvg />}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-icon relative mt-2">
                    <InputPassword
                      name="confirmPassword"
                      type="password"
                      register={register}
                      placeholder={t("ReTypeNewPassword")}
                      errors={errors}
                      options={{
                        required: t("RequiredConfirmPassword"),
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      }}
                      label={t("ReTypeNewPassword")}
                      eyeIconClassName="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer hover:opacity-70"
                      labelClassName={"font-semibold"}
                      isIcon={<PasswordSvg />}
                    />
                  </div>
                </div>
              </div>
              <SubmitButton
                title={t("SavePassword")}
                loading={customerPasswordLoading}
              />
            </form>
          </div>
        </div>
        {/* <AccountDelete /> */}
      </div>
    </>
  );
}
