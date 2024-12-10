"use client";
import React, { useEffect, useState } from "react";
import {
  addAddressFunction,
  getValue,
  updateAddressFunction,
} from "../Util/commonFunctions";
import { useMutation } from "@apollo/client";
import {
  SET_BILLING_ADDRESSES,
  SET_SHIPPING_ADDRESSES,
} from "@/lib/graphql/queries/checkout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";
import { useTranslations } from "next-intl";
import { fetchCart } from "@/lib/redux/slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addressFormate, className } from "./Extra";
import dynamic from "next/dynamic";
const BillingAddresCheckout = dynamic(
  () => import("../Common/Address/BillingAddresCheckout"),
  { ssr: false }
);
const ShippingBillingAddresses = dynamic(
  () => import("../Common/Address/Address"),
  { ssr: false }
);
const ShippingAddresCheckout = dynamic(
  () => import("../Common/Address/ShippingAddresCheckout"),
  { ssr: false }
);

export default function Address({ setShippingMethod, userName, className,billingLoading,ShippingLoading }) {
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [shippingSame, setShippingSame] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerData(1 ));
  }, [dispatch]);
  const [isEditable, setIsEditable] = useState({
    billingAddress: false,
    shippingAddress: true,
  });
  const t = useTranslations("Checkout");
  const [setShippingAddressesOnCart] = useMutation(SET_SHIPPING_ADDRESSES);
  const [setBillingAddressOnCart] = useMutation(SET_BILLING_ADDRESSES);
  const { data: customerData } = useSelector((state) => state.customerData);
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (customerData?.customer?.addresses) {
      const address = customerData?.customer?.addresses;
      var billAddres = address?.find((val) => val.default_billing === true);
      const shippAddres = address?.find((val) => val.default_shipping === true);

      if (billAddres?.id) {
        setBillingAddress(billAddres);
        if (billAddres && !Object.isFrozen(billAddres)) {
          delete billAddres.id;
        } else {
          billAddres = { ...billAddres };
          delete billAddres.id;
        }
        if (!shippingSame) {
          setShippingAddress(shippAddres);
        } else {
          setShippingAddress(billAddres);
        }
        updateState("billingAddress", true);
        updateState("shippingAddress", true);
      }
    }
  }, [customerData?.customer?.addresses]);

  useEffect(() => {
    if (cart && !token) {
      if (cart?.billing_address?.city) {
        const billAddres = addressFormate(cart?.billing_address);
        setBillingAddress(billAddres);
        if (!shippingSame) {
          const shippAddres = addressFormate(cart?.shipping_addresses[0]);
          setShippingAddress(shippAddres);
        } else {
          setShippingAddress(billAddres);
        }
        updateState("billingAddress", true);
        updateState("shippingAddress", true);
        if (!cart?.shipping_addresses[0]?.city && shippingSame) {
          setShippingAddressesCart(billAddres);
        }
      }
    }
  }, [cart]);

  const updateState = (fieldName, value) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const refetchCustomerData = () => {
    dispatch(fetchCustomerData(1));
  };

  const handleShippingAddress = (data) => {
    if (token) {
      setIsShippingLoading(true);
      if (![undefined, null, ""].includes(data?.id)) {
        const res = updateAddressFunction(
          data,
          customerData,
          refetchCustomerData
        );
        if (res.success) {
          updateState("shippingAddress", true);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = addAddressFunction(
          data,
          false,
          true,
          customerData,
          refetchCustomerData,
          userName
        );
        if (!res?.message) {
          updateState("shippingAddress", true);
        }
        dispatch(fetchCart());
      }
      setIsShippingLoading(false);
      shippingAddressOnCartFun({ data, customerData });
    } else {
      setIsShippingLoading(false);
      shippingAddressOnCartFun({ data });
    }
  };

  const shippingAddressOnCartFun = ({ data, customerData = {} }) => {
    const value = getValue({ data, customerData });
    setShippingAddressesCart(value);
  };

  const handleBillingAddress = (data) => {
    if (token) {
      setIsBillingLoading(true);
      if (![undefined, null, ""].includes(data?.id)) {
        const res = updateAddressFunction(
          data,
          customerData,
          refetchCustomerData
        );
        if (res.success) {
          updateState("billingAddress", true);
        } else {
          console.error("Error updating address:", res.message);
          toast.error(res.message);
        }
        setIsBillingLoading(false);
      } else {
        const res = addAddressFunction(
          data,
          true,
          false,
          customerData,
          refetchCustomerData,
          userName
        );
        // addAddressFunction(data, false, true, customerData, refetchCustomerData, userName);
        if (!res?.message) {
          addAddressFunction(
            data,
            false,
            true,
            customerData,
            refetchCustomerData,
            userName
          );
          updateState("billingAddress", true);
        }
        setIsBillingLoading(false);
        dispatch(fetchCart());
      }
      if (shippingSame) {
        shippingAddressOnCartFun({ data, customerData });
      }
      const value = getValue({ data, customerData, userName });
      setBillingAddressCart(value);
    } else {
      const value = getValue({ data });
      setBillingAddressCart(value, "guest");
        shippingAddressOnCartFun({ data });
      setIsBillingLoading(false);
    }
  };

  const setBillingAddressCart = (billingAddress) => {
    if (billingAddress.region) {
      delete billingAddress.region_id;
    } else if (billingAddress.region_id !== 0) {
      delete billingAddress.region;
    }
    setBillingAddressOnCart({
      variables: Object.assign(
        {
          cart_id: cartId,
          save_in_address_book: false,
          region: "",
        },
        billingAddress
      ),
      onCompleted: (res) => {
        if (!token) {
          updateState("billingAddress", false);
          dispatch(fetchCart());
          toast.success(t("BillingAddressAdded"));
        }
        setIsBillingLoading(false);
      },
      onError: (error) => {
        toast.error(error?.message);
        dispatch(fetchCart());
      },
    });
  };

  const setShippingAddressesCart = (shippingAddress) => {
    if (shippingAddress.region) {
      delete shippingAddress.region_id;
    } else if (shippingAddress.region_id !== 0) {
      delete shippingAddress.region;
    }
    setShippingAddressesOnCart({
      variables: Object.assign(
        {
          cart_id: cartId,
          save_in_address_book: false,
          region: "",
        },
        shippingAddress
      ),
      onError: (error) => {
        setIsShippingLoading(true);
        return toast.error(error || error[0]);
      },
      onCompleted: (res) => {
        dispatch(fetchCart());
        setShippingMethod(
          res?.setShippingAddressesOnCart?.cart?.shipping_addresses[0]
        );
        setIsShippingLoading(false);
      },
    });
  };

  const copyBillingAddress = (value) => {
    setShippingSame(value);
    var billAdddres = billingAddress;
    if (billAdddres && !Object.isFrozen(billAdddres)) {
      delete billAdddres.id;
    } else {
      billAdddres = { ...billAdddres };
      delete billAdddres.id;
    }

    setShippingAddress(billAdddres);
    updateState("shippingAddress", value);
    if (billAdddres.city && value) {
      setShippingAddressesCart(billAdddres);
    }
  };

  const editModeValue = (value) => {
    if (value?.city) {
      return true;
    }
    return false;
  };

  const onCancel = (fieldName) => {
    updateState(fieldName, true);
  };

  return (
    <div>
      {isEditable?.billingAddress && billingAddress?.city ? (
        <ShippingBillingAddresses
          data={billingAddress}
          callback={(e) =>
            updateState("billingAddress", !isEditable.billingAddress)
          }
          title={t("BillingAddress")}
          className={className}
        />
      ) : (
        <>
          <h3 className="text-2xl leading-normal font-semibold pt-5">
            {" "}
            {t("BillingAddress")}{" "}
          </h3>
          <BillingAddresCheckout
            address={billingAddress}
            onSubmit={handleBillingAddress}
            editMode={billingAddress?.id != undefined ? true : false}
            isBillingLoading={billingLoading || isBillingLoading }
            onCancel={(e) => onCancel("billingAddress")}
          />
        </>
      )}

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="shippingaddress"
          checked={shippingSame}
          className="rounded border-gray-300 text-blue-600 shadow-sm"
          onChange={(e) => copyBillingAddress(e.target.checked)}
        />
        <span className="mr-2 text-sm text-gray-600">
          {t("shippingAddressSameBilling")}
        </span>
      </div>

      {isEditable?.shippingAddress && shippingAddress?.city ? (
        <>
          <ShippingBillingAddresses
            data={shippingAddress}
            callback={(e) =>
              updateState("shippingAddress", !isEditable.shippingAddress)
            }
            title={t("ShippingAddress")}
            className={className}
          />
        </>
      ) : (
        !shippingSame && (
          <>
            <h3 className="text-2xl leading-normal font-semibold pt-5">
              {" "}
              {t("ShippingAddress")}{" "}
            </h3>
            <ShippingAddresCheckout
              address={shippingAddress}
              onSubmit={handleShippingAddress}
              editMode={editModeValue(shippingAddress)}
              isShippingLoading={ShippingLoading}
              onCancel={(e) => onCancel("shippingAddress")}
            />
          </>
        )
      )}
    </div>
  );
}
