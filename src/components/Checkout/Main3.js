"use client";
import React, { useState, useRef, useEffect } from "react";
import Summary from "./Main3Components/CartSummary";
import ProductsCard from "./Main3Components/productsCard";
import { useDispatch, useSelector } from "react-redux";
import { PayPalSvg } from "../SvgFiles/SvgFile";
import DeliveryMethod from "./Main3Components/DeliveryMethod";
import {
  CREATE_PAYPAL_EXPRESS_TOKEN,
  SET_BILLING_ADDRESSES,
  SET_PAYMENT_METHOD_AND_PLACE_ORDER,
  SET_SHIPPING_ADDRESSES,
} from "@/lib/graphql/queries/checkout";
import { checkValidation } from "./Validation";
import { useMutation } from "@apollo/client";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import { fetchCart, initCart } from "@/lib/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import PaymentMethod from "../Stripe/PaymentMethod";
import { PAYMENT_STATUS } from "./Extra";
import PaymentLayout from "@/components/Layout/StripeLayout";
import Payment from "../Stripe";
import { payPalOrderPlace } from "../Util/commonFunctions";
import Email from "./Email";
import Address from "./Address";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function Main3() {
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [userName, setUserName] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [shippingMethod, setShippingMethod] = useState([]);
  const [shippingMethodValue, setShippingMethodValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [setShippingAddressesOnCart] = useMutation(SET_SHIPPING_ADDRESSES);
  const {
    cart_id: cartId,
    token,
    cart,
  } = useSelector((state) => state.customer);
  const isShippingSameAsBilling = localStorage.getItem('isShippingSameAsBilling');
  const [setBillingAddressOnCart] = useMutation(SET_BILLING_ADDRESSES);
  const [setPaymentMethodAndPlaceOrder, { data: orderPlaceData }] = useMutation(
    SET_PAYMENT_METHOD_AND_PLACE_ORDER
  );
  const [createPayPalToken] = useMutation(CREATE_PAYPAL_EXPRESS_TOKEN);
  const formEl = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: customerData } = useSelector((state) => state.customerData);
  const emailRef = useRef(null);
  const methodRef = useRef(null);
  const t = useTranslations("Checkout");

  useEffect(() => {
    dispatch(fetchCustomerData(1));
  }, []);

  useEffect(() => {
    dispatch(fetchCart());

  }, []);

  useEffect(() => {
    if (cart.id) {
      setIsLoading(false);
      if (cart?.shipping_addresses[0]?.available_shipping_methods) {
        setShippingMethod(cart?.shipping_addresses[0]);
        setIsPaymentExpanded(true);
      }
    }
  }, [cart]);

  const getAddress = (data, fieldName) => {
    return data?.find((val) => val[fieldName]);
  };

  useEffect(() => {
    if (token && customerData?.customer) {
      const billingAddress = getAddress(
        customerData?.customer?.addresses,
        "default_billing"
      );
      if (billingAddress) {
        const clonedBillingAddress = { ...billingAddress };
        // Modify the cloned object based on the conditions
        if (clonedBillingAddress?.region?.region) {
          delete clonedBillingAddress.region_id;
          clonedBillingAddress.region = clonedBillingAddress.region.region;
        } else if (clonedBillingAddress.region_id !== 0) {
          if (clonedBillingAddress.region) {
            delete clonedBillingAddress.region.region;
          }
        }
        if (clonedBillingAddress?.city && shipToDifferentAddress) {
          setBillingAddressCart(clonedBillingAddress);
        }
        setBillingAddress(billingAddress);
      }
      const shippingAddress = getAddress(
        customerData?.customer?.addresses,
        "default_shipping"
      );
      if (shippingAddress) {
        setShippingAddress(shippingAddress);
      }
    }
  }, [customerData]);

  useEffect(() => {
    if (shippingAddress && cartId && shippingAddress?.city) {
      let address = { ...shippingAddress };
      if (address?.region?.region) {
        delete address.region_id
        address.region = address?.region?.region;
      } else if (address.region_id !== 0) {
        delete address?.region?.region
      }
      if (isShippingSameAsBilling === true) {
        setShippingAddressesOnCart({
          variables: Object.assign(
            {
              cart_id: cartId,
              save_in_address_book: false,
              region: "",
            },
            address
          ),
        })
          .then((res) => {
            if (
              res?.data?.setShippingAddressesOnCart?.cart?.shipping_addresses[0]
            ) {
              setShippingMethod(
                res?.data?.setShippingAddressesOnCart?.cart?.shipping_addresses[0]
              );
              setIsPaymentExpanded(true);
            }
          })
          .catch((e) => { });
      }
    }
  }, [shippingAddress]);

  const setBillingAddressCart = (billingAddress) => {

    if (billingAddress?.city) {
      setShipToDifferentAddress(true)

      setBillingAddressOnCart({
        variables: Object.assign(
          {
            cart_id: cartId,
            save_in_address_book: false,
            region: "",
          },
          billingAddress
        ),
      });
    }
  };

  const buttonClick = () => {
    if (checkValidation({ cart, billingAddress, shippingAddress }) != "") {
      if (checkValidation({ cart, billingAddress, shippingAddress }) === 'Please Enter your email') {
        emailRef.current?.focus();
      }
      if (checkValidation({ cart, billingAddress, shippingAddress }) === 'Please select Shipping Method') {
        methodRef.current?.focus();
      }
      return toast.error(
        checkValidation({ cart, billingAddress, shippingAddress })
      );
    }
    if (formEl.current) {
      formEl.current.submitForm();
    }
  };

  const placeOrder = (payment) => {
    setPaymentLoading(true);
    setPaymentMethodAndPlaceOrder({
      variables: {
        cart_id: cartId,
        payment_id: payment?.id,
      },
      update: (cache, data) => {
        // removeLocalStorageData();
        const order_id =
          data?.data?.setPaymentMethodAndPlaceOrder?.order.order_id;
        setTimeout(() => {
          dispatch(initCart());
        }, 2000);
        router.push(`/thanks?order_id=${order_id}`);
      },
      onError: ({ graphQLErrors }) => {
        var error = graphQLErrors.reduce((r, i) => r.concat(i?.message), []);
        setPaymentLoading(false);
        return toast.error(error[0] || error);
      },
      onCompleted(res) {
        dispatch(fetchCart());
        setPaymentLoading(false);
      },
    });
  };

  return (
    <section className="section-checkout py-[50px] max-[1199px]:py-[35px]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1499px]:max-w-[1500px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full mb-[-24px] md:flex-row flex-col-reverse">
          <div className="min-[992px]:w-[33.33%] w-full px-[12px] mb-[24px]">
            <div className="bb-checkout-sidebar mb-[-24px]">
              <div className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px] aos-init aos-animate">
                <Summary />
                <div className="bb-checkout-pro mb-[-24px]">
                  <ProductsCard />
                </div>
              </div>

              <DeliveryMethod
                shippingMethod={shippingMethod?.available_shipping_methods}
                shippingMethodValue={shippingMethodValue}
                methodRef={methodRef}
              />

              <div className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px] aos-init aos-animate">
                <div className="sub-title mb-[12px]">
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    {t("PaymentMethod")}
                  </h4>
                </div>

                <div className="checkout-method mb-[24px]">
                  <span className="details font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-medium text-[#686e7d]">
                    {t("DeliveryMethodMessage")}
                  </span>
                  <PaymentMethod
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    title=" "
                  />
                </div>
              </div>
              <div className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px] aos-init aos-animate">
                <div className="sub-title mb-[12px]">
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    {t("PaymentMethod")}
                  </h4>
                </div>
                {paymentMethod === PAYMENT_STATUS.STRIPE && (
                  <PaymentLayout>
                    <Payment
                      genrateCardId={placeOrder}
                      formRef={formEl}
                      paymentLoading={setPaymentLoading}
                      className=""
                    />
                  </PaymentLayout>
                )}
                {paymentMethod === PAYMENT_STATUS.PAYPAL && (
                  <div
                    className="paypal-button cursor-pointer bg-yellow-400 text-center flex justify-center mt-4 py-4 paypal-button-number-0 paypal-button-layout-vertical paypal-button-number-multiple paypal-button-env-sandbox paypal-button-color-gold paypal-button-text-color-black paypal-logo-color-blue  paypal-button-shape-rect"
                    tabIndex={0}
                    aria-label="PayPal"
                    onClick={() => {
                      payPalOrderPlace(cartId, createPayPalToken, router);
                    }}
                  >
                    <div className="paypal-button-label-container">
                      <PayPalSvg />
                    </div>
                  </div>
                )}
              </div>
              <div className="input-box-form mt-[20px]">
                <div className="flex flex-wrap mx-[-12px]">
                  <div className="w-full px-[12px]">
                    <div className="input-button">
                      <button
                        type="button"
                        className="bg-primary text-white text-xl w-full min-w-[300px] py-2 round !text-center rounded-md"
                        onClick={() => buttonClick()}
                        disabled={paymentLoading}
                      >
                        {paymentLoading ? "Sending..." : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
            <div className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] aos-init aos-animate">
              <Email setUserName={setUserName} emailRef={emailRef} />
              <Address
                setShippingMethod={setShippingMethod}
                userName={userName}
                className="w-full h-fit py-4 my-4 "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
