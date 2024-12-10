"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalSvg } from "@/components/SvgFiles/SvgFile";
import { fetchCart, initCart } from "@/lib/redux/slices/cartSlice";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cloneDeep } from 'lodash'; // Optional: If you want to use lodash

import { useRouter } from "next/navigation";
import { PAYMENT_STATUS } from "./Extra";
import { checkValidation } from "./Validation";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import {
  CREATE_PAYPAL_EXPRESS_TOKEN,
  SET_BILLING_ADDRESSES,
  SET_PAYMENT_METHOD_AND_PLACE_ORDER,
  SET_SHIPPING_ADDRESSES,
} from "@/lib/graphql/queries/checkout";
import {
  payPalOrderPlace,
} from "@/components/Util/commonFunctions";
import Address from "./Address";
import dynamic from 'next/dynamic'
const GuestLoginSignupCard = dynamic(() => import('./GuestLoginSignupCard'), { ssr: false });
const Payment = dynamic(() => import('../Stripe'), { ssr: false });
const PaymentMethod = dynamic(() => import('../Stripe/PaymentMethod'), { ssr: false });
const ShippingMethod = dynamic(() => import('./ShippingMethod'), { ssr: false });
const Email = dynamic(() => import('./Email'), { ssr: false });
const SubmitButton = dynamic(() => import('@/components/Util/Button/SubmitButton'), { ssr: false });
const PaymentLayout = dynamic(() => import('@/components/Layout/StripeLayout'), { ssr: false });


export default function Customer() {
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [shippingMethod, setShippingMethod] = useState([]);
  const [shippingMethodValue, setShippingMethodValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [setShippingAddressesOnCart] = useMutation(SET_SHIPPING_ADDRESSES);
  const {
    cart_id: cartId,
    token,
    cart,
  } = useSelector((state) => state.customer);
  const userToken = localStorage.getItem("token")
  const [setBillingAddressOnCart] = useMutation(SET_BILLING_ADDRESSES);
  const [setPaymentMethodAndPlaceOrder, { data: orderPlaceData }] = useMutation(
    SET_PAYMENT_METHOD_AND_PLACE_ORDER
  );
  const [createPayPalToken] = useMutation(CREATE_PAYPAL_EXPRESS_TOKEN);
  const formEl = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: customerData } = useSelector((state) => state.customerData);

  useEffect(() => {
    dispatch(fetchCustomerData(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    if (cart.id) {
      setIsLoading(false);
      if (cart?.shipping_addresses[0]?.available_shipping_methods) {
        setShippingMethod(cart?.shipping_addresses[0]);
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
            const clonedBillingAddress = cloneDeep(billingAddress);
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
            setBillingAddress(clonedBillingAddress);
        }
    }
}, [customerData]);


useEffect(() => {
  if (shippingAddress && cartId && shippingAddress?.city) {
      const address = cloneDeep(shippingAddress);
      if (address?.region?.region) {
          delete address.region_id;
          address.region = address?.region?.region;
      } else if (address.region_id !== 0) {
          delete address?.region?.region;
      }
          setShippingAddressesOnCart({
              variables: {
                  cart_id: cartId,
                  save_in_address_book: false,
                  region: "",
                  ...address,
              },
          });
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
    !isLoading &&
    <div>
      <GuestLoginSignupCard token={userToken} />
      <Email setUserName={setUserName} />

      <Address setShippingMethod={setShippingMethod} userName={userName} />
      <ShippingMethod shippingMethod={shippingMethod?.available_shipping_methods} shippingMethodValue={shippingMethodValue} />
      <div className="py-5">
        <PaymentMethod setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
        {paymentMethod === PAYMENT_STATUS.STRIPE && (
          <PaymentLayout>
            <Payment genrateCardId={placeOrder} formRef={formEl} paymentLoading={setPaymentLoading} />
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

      <div className="mt-4">
        <SubmitButton
          className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md w-full"
          title="Continue to checkout"
          handleClick={() => buttonClick()}
          disabled={paymentLoading}
          loading={paymentLoading}
        />
      </div>
    </div>
  );
}
