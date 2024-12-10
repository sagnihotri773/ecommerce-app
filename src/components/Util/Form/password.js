"use client";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react'
export const InputPassword = ({
  name,
  placeholder,
  register,
  errors,
  label,
  options,
  isIcon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const style =
    `mt-3 ${isIcon ? 'ps-7' : ''} w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0`;
  return (
    <>
      {isIcon}
      <div className={"w-full relative"}>
        {label && (
          <label htmlFor={label} className="font-semibold">
            {label}
            {options?.required && <span className="text-[#F25454]">*</span>}
          </label>
        )}
        <input
          type={showPassword ? "text" : "password"}
          {...register(name, {
            ...options,
          })}
          placeholder={placeholder}
          className={style}
        />
        <div
          className="absolute right-4 top-[56px] transform -translate-y-1/2 cursor-pointer hover:opacity-70"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </div>
        {errors[name] && (
          <p className={"text-sm text-red-500 mt-1"}>
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};
