"use client";
import {
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_EMAIL,
} from "@/lib/graphql/queries/customer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { InputText } from "./input";
import InputEmail from "./email";
import { InputPassword } from "./password";
import { useMutation } from "@apollo/client";
import { useTranslations } from "next-intl";
import {
  EmailSvg,
  PasswordSvg,
  UserLastNameSvg,
  UserProfileSvg,
} from "@/components/SvgFiles/SvgFile";
import SubmitButton from "../Button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";

export const UpdateCustomerDetailForm = () => {
  const { data } = useSelector((state) => state.customerData);

  const { firstname, lastname, email, custom_attributes } =
    data?.customer || {};
  const t = useTranslations("UpdateCustomerDetail");
  const dispatch = useDispatch();
  const [updateCustomerDetail, { loading: customerDetailLoading }] =
    useMutation(UPDATE_CUSTOMER);
  const [updateCustomerEmail, { loading: customerEmailLoading }] = useMutation(
    UPDATE_CUSTOMER_EMAIL
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    updateCustomerDetail({
      variables: {
        input: {
          firstname: data?.firstname,
          lastname: data?.lastname,
        },
      },
      onCompleted: (res) => {
        updateCustomerEmail({
          variables: {
            email: data?.email,
            password: data?.password,
          },
          onCompleted: (res) => {
            dispatch(fetchCustomerData(1));
            toast.success(t("PersonalDetailsUpdateSuccess"));
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  useEffect(() => {
    if (data) {
      setValue("firstname", firstname || "");
      setValue("lastname", lastname || "");
      setValue("email", email || "");
      const phone = custom_attributes.find((x) => x.code === "phone_number");
      setValue(phone?.value);
    }
  }, [data, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div className="form-icon relative mt-2">
            <InputText
              register={register}
              name="firstname"
              placeholder={t("FirstName")}
              options={{ required: t("FirstNameRequired") }}
              errors={errors}
              label={t("FirstName")}
              isIcon={<UserProfileSvg />}
            />
          </div>
        </div>
        <div>
          <div className="form-icon relative mt-2">
            <InputText
              register={register}
              name="lastname"
              placeholder={t("LastName")}
              options={{ required: t("LastNameRequired") }}
              errors={errors}
              label={t("LastName")}
              isIcon={<UserLastNameSvg />}
            />
          </div>
        </div>
        <div>
          <div className="form-icon relative mt-2">
            <InputEmail
              name="email"
              register={register}
              placeholder={t("YourEmail")}
              errors={errors}
              options={{
                required: t("EmailRequired"),
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              }}
              label={t("YourEmail")}
              isIcon={<EmailSvg />}
            />
          </div>
        </div>
        <div>
          <div className="form-icon relative mt-2">
            <InputPassword
              name="password"
              register={register}
              placeholder={t("currentPassword")}
              errors={errors}
              options={{
                required: t("PasswordRequired"),
                minLength: {
                  value: 8,
                  message: t("PasswordMinLength"),
                },
              }}
              label={t("Password")}
              isIcon={<PasswordSvg />}
            />
          </div>
        </div>
      </div>

      <SubmitButton
        title={t("SaveChanges")}
        loading={customerDetailLoading || customerEmailLoading}
      />
    </form>
  );
};
