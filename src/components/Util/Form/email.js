import { useTranslations } from "next-intl";
import React from "react";
export default function InputEmail({
  register = "",
  options = "",
  name = "",
  label = "",
  errors = "",
  isIcon = false
}) {
  const validateEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return (
    <>
      {isIcon}
      <div className="w-full">
        {label && (
          <label htmlFor={label} className="font-semibold">
            {label}
            {options?.required && (
              <span className="text-[#F25454]">*</span>
            )}
          </label>
        )}
        <input
          type="email"
          {...register(name, {
            ...options,
            pattern: { value: validateEmail, message: "Incorrect format" },
          })}
          placeholder="name@example.com"
          className={`mt-3 ${isIcon ? 'ps-7' : ''} w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0`}
        />
        {errors[name] && (
          <p className="text-sm text-red-500 mt-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
}
