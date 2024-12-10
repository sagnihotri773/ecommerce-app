import { useTranslations } from "next-intl";

export const CheckBox = ({
  name,
  options,
  labelText,
  termsText,
  register = () => ({}),
  label,
  errors,
}) => {

  return (
    <>
      <div>
        <input
          className="form-checkbox cursor-pointer rounded border-gray-100 dark:border-gray-800 text-primary focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
          type="checkbox"
          name={name}
          defaultValue=""
          {...register(name, {
            ...options,
          })}
        />

        <label className="form-check-label text-slate-400" htmlFor={label}>
          {labelText}
          <span className="text-primary">
            {termsText}
          </span>
        </label>
        {errors[name] && (
          <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};
