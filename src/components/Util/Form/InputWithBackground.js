export const InputWithBackground = (
    name = "",
    register = "",
    options = {},
    errors = {},
    onChange = "",
    value = "",
    placeholder = "" // declare placeholder as a prop
  ) => {
    return (
      <div className="w-[80%] m-auto">
        <input
          {...register(name, options)} // correctly registering input
          type="text"
          className="px-3 pe-10 w-full py-5 border-0 !bg-black focus:ring-0 h-[66px] outline-none text-white"
          onChange={onChange ? (e) => onChange(e) : null}
          value={value}
          placeholder={placeholder} // use the placeholder prop
        />
        {errors[name] && (
          <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
    );
  };
  