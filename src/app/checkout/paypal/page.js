"use client";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  PLACE_ORDER_PAYPAL,
  SET_PAYMENT_METHOD_ONCART,
  SET_SHIPPING_METHODS,
} from "@/lib/graphql/queries/checkout";
import { useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";


const Loader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-primary bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
    <p className="text-white text-lg">
      We are processing your order payment...
    </p>
  </div>
);

export default function PaypalSuccess() {
  const { cart_id: cartId } = useSelector((state) => state.customer);
  const [setPaymentMethod, { loading }] = useMutation(
    SET_PAYMENT_METHOD_ONCART
  );
  const [placeOrder, { loading: placeOrderLoading }] =
    useMutation(PLACE_ORDER_PAYPAL);
  const [setShippingMethodOnCart] = useMutation(SET_SHIPPING_METHODS);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");

  useEffect(() => {
    if (token && PayerID) {
      setPaymentMethod({
        variables: {
          cart_id: cartId,
          payer_id: PayerID,
          token,
        },
      }).then((res) => {
        setShippingMethodOnCart({
          variables: {
            cart_id: cartId,
            method_code: "flatrate",
            carrier_code: "flatrate",
          },
        }).then((res) => {
          placeOrder({
            variables: {
              cart_id: cartId,
            },
          }).then((data) => {
            router.push(
              `/thanks?order_id=${data?.data?.placeOrder?.orderV2?.number}`
            );
          });
        });
      });
    }
  }, [token, PayerID]);

  return (
    <div>
      {loading || (placeOrderLoading && <Loader />)}
      <div className="h-[100vh] ">
        {/* Add any additional content here */}
      </div>
    </div>
  );
}
