export default function TextArea({
  label="",
  name="",
  className="",
  placeholder="",
  register="",
  errors="",
  options="",
}) {
  return (
    <>
      {label && (
        <label htmlFor={label} className="font-semibold">
          {label}
          {options?.required && <span className="text-[#F25454]">&lowast;</span>}
        </label>
      )}

      <textarea
        name={name}
        {...register(name, options)}
        className={
          className
            ? className
            : "mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
        }
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  );
}
