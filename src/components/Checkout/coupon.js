import { useState } from "react";
import { APPLY_COUPON_TO_CART } from "@/lib/graphql/queries/checkout";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { fetchCart } from "@/lib/redux/slices/cartSlice";
import dynamic from 'next/dynamic'
const SubmitButton = dynamic(() => import('@/components/Util/Button/SubmitButton'), { ssr: false });
const RoundedInput = dynamic(() => import('../Util/Form/input-rounded'), { ssr: false });


let Class = "px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-primary text-white rounded-full";

export default function Coupon({ className = Class }) {
  const t = useTranslations("Checkout");
  const [error, setError] = useState("");
  const cartId = useSelector((state) => state.customer.cart_id);
  const dispatch = useDispatch()
  const [applyCouponToCart, { loading, data }] =
    useMutation(APPLY_COUPON_TO_CART);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    applyCouponToCart({
      variables: {
        cart_id: cartId,
        coupon_code: data?.promo,
      },
      onError(err) {
        setError(err.message);
      },
      onCompleted(res) {
        dispatch(fetchCart())
        reset();
      },
    });
  };
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="subcribe-form mt-6">
            <div className="flex justify-between space-x-2 relative max-w-xl">
              <RoundedInput
                placeholder="Apply Coupon"
                type="text"
                name="promo"
                required
                register={register}
                options={{ required: "This field is require" }}
                errors={errors}
              />

              <SubmitButton
                className={className}
                disabled={loading}
                loading={loading}
                title="Apply"
              />
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="text-center">
        {error ? <p className="text-[red] mt-0">{error}</p> : ""}
      </div>
    </>
  );
}
