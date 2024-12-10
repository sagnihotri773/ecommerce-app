export default function RoundedInput({
    name = "",
    register,
    options = {},
    label = "",
    placeholder = "",
    errors = {},
  }) {
    return (
      <>
        {label && (
  <label htmlFor={label} className="font-semibold">
    {label}
    {options?.required && (
      <span className="text-[#F25454]">*</span>
    )}
  </label>
)}
        <input
          {...register(name, options)}
          placeholder={placeholder}
          type="text"
          className="uppercase w-full px-3 py-3 text-gray-700 border rounded-md outline-none transition-colors duration-200 ease-in-out
          focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
          hover:border-gray-400"
        />
        {errors[name] && (
          <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
        )}
      </>
    );
  }
  