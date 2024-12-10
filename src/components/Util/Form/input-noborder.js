export const InputNoBorder = ({ name = "", register = "", options = "",errors }) => {
  return (
    <div>
      <input
      {...register(name, options)}
        type="email"
        placeholder="Your Email Address"
        className="border-b-2 border-gray-300 md:min-w-[769px] h-[46px] bg-transparent focus:outline-none mb-4 text-center w-80"
      />

      {errors[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};
