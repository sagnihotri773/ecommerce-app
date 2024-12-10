export const TransParentInput = ({ register, name, options, errors }) => {
    return (
        <div>
            <input
                id="email"
                type="email"
                {...register(name, options)}
                placeholder="E-Mail"
                className="mt-2 p-2 border-b w-full border-white text-white bg-transparent focus:outline-none"
                
            />

            {errors[name] && (
                <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
            )}
        </div>
    )
}