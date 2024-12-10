"use client"
import { REQUEST_PASSWORD } from "@/lib/graphql/queries/password";
import { LgButton } from "../Button/Button-lg"
import { InputPassword } from "./password"
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { loginUrl, passwordResetSuccessUrl } from "@/components/RouteManager";

export const SetNewPasswordForm = () => {
    const [resetPassword, { loading: resetPasswordLoading }] =
        useMutation(REQUEST_PASSWORD);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = localStorage.getItem("restPasswordEmail");
    const onSubmit = async (data) => {
        try {
            await resetPassword({
                variables: {
                    email: email,
                    resetPasswordToken: token,
                    newPassword: data.password,
                },
            });
            router.push(passwordResetSuccessUrl);
        } catch (error) {
            toast.error(error?.message);
        }
    };

    const t = useTranslations("CreatePassword");

    const password = watch("password");
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-start lg:py-20 py-8"
        >
            <h1 className="text-center   leading-none mb-1 text-3xl text-primary">
                {t("EnterPassword")}
            </h1>
            <p className="text-center tracking-tighter text-[14px] py-6 sm:text-lg font-light">
                {t("EnterNewPassword")}
            </p>
            <div className="grid grid-cols-1">
                <div className="mb-4">
                    <InputPassword
                        name="password"
                        register={register}
                        placeholder={t("EnterPassword")}
                        errors={errors}
                        options={{ required: t("FieldRequired") }}
                        label={t("EnterPassword")}
                    />
                </div>
                <div className="mb-4">
                    <InputPassword
                        name="Confirmpassword"
                        register={register}
                        placeholder={t("ConfirmPassword")}
                        errors={errors}
                        options={{
                            required: t("FieldRequired"),
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        }}
                        label={t("ConfirmPassword")}
                    />
                </div>
                <div className="mb-4">
                    <LgButton
                        title={t("ChangePassword")}
                        loading={resetPasswordLoading}
                        disable={resetPasswordLoading}
                    />
                </div>
                <div
                    onClick={() => router.push(loginUrl)}
                    className="text-center cursor-pointer"
                >
                    {t("BackToLogin")}
                </div>
            </div>
        </form>
    )
}