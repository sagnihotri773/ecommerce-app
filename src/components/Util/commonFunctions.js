"use client";
import { GENERATE_CUSTOMER_TOKEN } from "@/lib/graphql/queries/register";
import { fetchCart, initCart, mergeCart } from "@/lib/redux/slices/cartSlice";
import { createDynamicData } from "./commonGraphQuery";
import Cookies from "js-cookie";
import {
  ADD_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
} from "@/lib/graphql/queries/checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { client } from "@/lib/graphql/apolloClient";
import { homeUrl } from "@/components/RouteManager";
import { closeDrawer } from "@/lib/redux/slices/drawerSlice";
import {
  addWishlistItemsToCart,
  fetchWishlist,
} from "@/lib/redux/slices/wishlistSlice";
import { fetchCustomerData } from "@/lib/redux/slices/customerSlice";

import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

const STATUS = {
  CART: "cart",
  STOCK: "IN_STOCK",
};

export const generateToken = async (
  data,
  router,
  toastMessage,
  dispatch,
  routePath = "",
  redirect
) => {
  const result = await createDynamicData(
    GENERATE_CUSTOMER_TOKEN,
    data,
    dispatch
  );
  try {
    if (result?.generateCustomerToken?.token) {
      dispatch(mergeCart());
      localStorage.setItem("token", result?.generateCustomerToken?.token);
      if (result?.generateCustomerToken?.token) {
        toast.success(toastMessage);
      }
      Cookies.set("token", result?.generateCustomerToken?.token, {
        expires: 1,
        path: "/",
      }); // Expires in 1 days
      dispatch(closeDrawer());
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      dispatch(fetchCustomerData(1));
      if (redirect) {
        if (routePath) {
          router.push(routePath);
        } else {
          router.push(homeUrl);
        }
      }
    }
  } catch (error) {
    console.log(error, "errormessage");
  }
};

export const DRAWER_TYPE = {
  CART: "cart",
  WISHLIST: "wishlist",
  USER: "user",
};

export const redirectToCart = (value, router, params) => {
  router.push(`${value}`);
};

export default function GetCustomAtrribute({ custData, code }) {
  return custData?.custom_attributes?.find((item) => item.code === code)?.value;
}

export const payPalOrderPlace = async (cartId, createPayPalToken, router) => {
  try {
    const { data } = await createPayPalToken({
      variables: { cart_id: cartId },
    });

    if (
      data.createPaypalExpressToken &&
      data.createPaypalExpressToken.paypal_urls
    ) {
      const { start } = data.createPaypalExpressToken.paypal_urls;
      router.push(start);
    } else {
      toast.error("Failed to get PayPal token. Please try again.");
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  }
};

export const saveRoutePath = (value) => {
  localStorage.setItem("auth_refer", value);
};

export const getRoutePath = () => {
  const path = localStorage.getItem("auth_refer");
  return path || "";
};

export const logOut = ({ router, dispatch }) => {
  localStorage.removeItem("token");
  Cookies.remove("token");
  dispatch(initCart());
  localStorage.removeItem("cart_id");
  router.push(homeUrl);
};

export const getValueFind = (options, findWith, fieldName) => {
  return options?.find((val) => val[findWith] == fieldName);
};

export const getOtprionValue = (
  options,
  findWith,
  sku,
  fieldName,
  selectedOptions = {}
) => {
  return options?.find(
    (val) => val[findWith] == selectedOptions[sku][fieldName]
  )?.label;
};

export const getStockStatus = (status) => {
  if (status) {
    return STATUS.STOCK === status ? (
      <p className="text-green-600 mt-2"> IN STOCK </p>
    ) : (
      <p className="text-red-600"> OUT OF STOCK </p>
    );
  }
  return;
};

export const getStockStatusCount = (status) => {
  return STATUS.STOCK === status ? 1 : 0;
};
export const updateAddressFunction = async (
  data,
  customerData,
  refetchCustomerData
) => {
  try {
    const variables = {
      id: data?.id,
      country_code: data?.country || data?.country_code,
      street: data?.street,
      telephone: data?.telephone,
      postcode: data?.postcode,
      city: data?.city,
      firstname: customerData?.customer?.firstname,
      lastname: customerData?.customer?.lastname,
      default_shipping: data?.default_shipping,
      default_billing: data?.default_billing,
    };
    if (data?.region_id) {
      variables.region_id = data.region_id;
    }
    if (data?.region) {
      variables.region = data.region;
      variables.region_id = null;
    }

    const { addressData } = await client.mutate({
      mutation: UPDATE_CUSTOMER_ADDRESS,
      variables: variables,
      fetchPolicy: "no-cache",
    });
    refetchCustomerData();
    toast.success("You updated the address.");
    return { success: true, addressData };
  } catch (error) {
    toast.error(error.message);
    return { success: false, message: error.message };
  }
};

export const addAddressFunction = async (
  data,
  defaultBilling,
  defaultShipping,
  customerData,
  refetchCustomerData,
  userName = "Guest"
) => {
  try {
    const variables = {
      country_code: data?.country || data?.country_code,
      street: data?.street,
      telephone: data?.telephone,
      postcode: data?.postcode,
      city: data?.city,
      firstname:
        data.firstname || customerData?.customer?.firstname || userName,
      lastname: data.lastName || customerData?.customer?.lastname || userName,
      default_shipping: defaultShipping,
      default_billing: defaultBilling,
    }
    delete variables.region_id
    delete variables.region
    if (data.region_id) {
      variables.region_id = data?.region_id
    } else if (data?.region) {
      variables.region = data?.region
    }

    const { addressData } = await client.mutate({
      mutation: ADD_CUSTOMER_ADDRESS,
      variables: variables,
      fetchPolicy: "no-cache",
    });
    refetchCustomerData();
    toast.success("You saved the address.");
    return addressData;
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Cancel":
      return "text-red-600";
    case "Complete":
      return "text-green-600";
    case "Processing":
      return "text-slate-400";
    case "Pending":
      return "text-yellow-600";
    default:
      return "";
  }
};

export const currentStoreCode =
  typeof window !== "undefined" ? localStorage.getItem("currentStoreCode") : null;

export const ratingCountShow = (count = 0) => {
  return Number(Math?.round(count / 20));
};

export const getValue = ({ data, customerData, userName = "" }) => {
  const { telephone, street, region_id, region, city, country, postcode } =
    data;
  const value = {
    firstname: customerData?.customer?.firstname || data.firstName,
    lastname: customerData?.customer?.lastname || data.lastName,
    country_code: data?.country || data?.country_code,
    region_id: Number(region_id),
    telephone,
    street,
    region,
    city,
    country,
    postcode,
  };
  return value;
};
export const authToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const getPriceAmount = (amount, qty) => {
  if (!["", null, undefined].includes(qty)) {
    return amount * qty;
  }
  return amount;
};

export const CART_TYPE = {
  CONFIGURABLE: 'ConfigurableCartItem',
  BUNDLECARTITEM: "BundleCartItem"
};

export const getQty = (item) => {
  const qty = item?.quantity ? item?.quantity : item?.qty;
  return " X " + qty;
};

export const addWishlistToCart = (item, router, dispatch) => {
  if (
    item?.product?.__typename === "ConfigurableProduct" ||
    item?.product?.__typename === "BundleProduct" ||
    item?.product?.__typename === "GroupedProduct"
  ) {
    dispatch(closeDrawer());
    router.push(`/${item?.product?.url_rewrites?.[0]?.url}`);
  } else {
    dispatch(
      addWishlistItemsToCart({
        wishlistItemIds: item?.id,
      })
    );
  }
};

export const UrlSuffix = (availableStores) => {
  const findLogo = availableStores?.find(
    (item) => item?.store_code === currentStoreCode
  )?.category_url_suffix;

  const value = ![null, undefined, ""].includes(findLogo) ? findLogo : "";
  return value;
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const descriptionRender = (value = "") => {
  const unescapedHtml = value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

  return unescapedHtml;
};

export const renderHtmlDynamic = (value, className = "") => {
  return value ? <div className={className}
    dangerouslySetInnerHTML={{
      __html: descriptionRender(
        value
      )
    }}
  /> : ''
}

export const getPrice = (option, value) => {
  return option?.product?.price_range?.minimum_price[value]?.value
}


export const getProductsPrice = ({ products }) => {
  const finalPrice = products?.price_range?.minimum_price?.final_price?.value;
  const regularPrice = products?.price_range?.minimum_price?.regular_price?.value;
  const hasDiscount = finalPrice !== regularPrice;

  return (
    <>
      <Price amount={finalPrice || regularPrice} />
      {hasDiscount && (
        <del className="text-[#444444] font-[400] pl-3">
          <Price amount={regularPrice} />
        </del>
      )}
    </>
  );
};

export function handleKeyPress(event, callback) {
  if (["Escape"].includes(event.key)) {
    callback();
  }
}

export function addKeyListener(callback) {
  const keyListener = (event) => handleKeyPress(event, callback);
  document.addEventListener("keydown", keyListener);
  return () => {
    document.removeEventListener("keydown", keyListener);
  };
}

export const truncateTitle = (title , length=30) => {
  if (title.length > length) {
    return `${title.substring(0, length)}...`;
  }
  return title;
};


export const getCookieValue = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
}
 
export function removeKeysFromObject(obj, keysToRemove) {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToRemove.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}