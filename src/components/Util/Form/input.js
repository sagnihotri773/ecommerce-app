export const InputText = ({
  name = "",
  register = "",
  options = "",
  label = "",
  placeholder = "",
  className = "",
  errors = "",
  onChange = "",
  cotainerClasaName = "",
  autoFocus= false,
  isIcon= false
}) => {
  return (
    <> 
    {isIcon}
    <div className={cotainerClasaName ? cotainerClasaName : "w-full"}>
      {label && (
        <label htmlFor={label} className="font-semibold">
          {label}
          {options?.required && <span className="text-[#F25454]">*</span>}
        </label>
      )}
      <input
        autoFocus={autoFocus}
        type="text"
        {...register(name, options)}
        placeholder={placeholder}
        className={
          className
            ? className
            : `mt-3 w-full py-2 ${isIcon ? 'ps-7': ''} px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0`
        }
        onChange={onChange ? (e) => onChange(e) : null}
      />
      {errors[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
    </>
  );
};
