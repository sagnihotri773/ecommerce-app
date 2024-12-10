"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import { checkOutUrl, shopCartUrl, shopUrl } from "@/components/RouteManager";
import {
  CART_TYPE,
  getPrice,
  getPriceAmount,
  getQty,
  getStockStatus,
  truncateTitle,
} from "@/components/Util/commonFunctions";
import {
  removeItemFromCart,
  updateCartItemsQuantity,
} from "@/lib/redux/slices/cartSlice";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import dynamic from "next/dynamic";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});
const ProductQuantity = dynamic(() => import("@/components/Product/Quantity"), {
  ssr: false,
});

export default function drawer1() {
  const t = useTranslations("ShoppingCart");
  const dispatch = useDispatch();
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});

  const initializeQuantities = useCallback(() => {
    const initialQuantities = {};
    cart?.itemsV2?.items.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  useEffect(() => {
    initializeQuantities();
  }, [initializeQuantities]);

  const removeCartItem = (cart_item_id) => {
    dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id }));
  };

  const UpdateCartItem = useCallback(
    (id, count) => {
      dispatch(updateCartItemsQuantity({ id, count, cartId }));
    },
    [cartId, dispatch]
  );

  const debouncedUpdateCartItem = useDebouncedCallback((id, count) => {
    UpdateCartItem(id, count);
  }, 500);

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const cartItems = cart?.itemsV2?.items || [];

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleInputChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
    debouncedUpdateCartItem(id, value);
  };

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <div className="flex-grow overflow-auto">
        {cart?.itemsV2?.items?.length > 0 ? (
          cart?.itemsV2?.items?.map((item) => (
            <ul className="py-4" key={item?.id}>
              <li className="flex">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item?.product?.image?.url}
                    alt="Product image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3> {truncateTitle(item?.product?.name)} </h3>

                      <p className="ml-4">
                        {item?.__typename !== CART_TYPE.BUNDLECARTITEM ? (
                          <Price
                            amount={getPriceAmount(
                              getPrice(item, "final_price") ||
                              getPrice(item, "regular_price"),
                              item?.quantity
                            )}
                          />
                        ) : (
                          <Price amount={item?.prices?.price?.value} />
                        )}
                      </p>
                    </div>
                    {item?.__typename !== CART_TYPE.BUNDLECARTITEM && (
                      <p className="mt-1 text-sm text-gray-500 text-left">
                        <Price
                          amount={
                            getPrice(item, "final_price") ||
                            getPrice(item, "regular_price")
                          }
                        />
                        {getQty(item)}
                      </p>
                    )}
                    <ul className="list-none">
                      {item?.__typename === CART_TYPE.CONFIGURABLE
                        ? item?.configurable_options.map((config, i) => (
                          <li key={i}>
                            {config.option_label}: {config.value_label}
                          </li>
                        ))
                        : item?.__typename === CART_TYPE.BUNDLECARTITEM
                          ? item?.bundle_options.map((bundle, i) => (
                            <li key={i}>
                              <span className="font-bold">{bundle.label}:</span>
                              {bundle?.values?.map((val, index) => (
                                <span key={index}>
                                  {val?.quantity}x {val.label} -{" "}
                                  <Price amount={val?.price} />{" "}
                                  {index < bundle.values.length - 1 && ", "}
                                </span>
                              ))}
                            </li>
                          ))
                          : null}
                    </ul>
                    {getStockStatus(item?.product?.stock_status)}

                    <div className="flex items-center">
                      <h5 className="text-lg font-semibold me-2">
                        Quantity
                      </h5>
                      <div className="qty-icons ms-3 space-x-0.5 flex">
                        <button
                          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-primary text-primary hover:text-white minus"
                          onClick={() =>
                            handleInputChange(
                              item?.id,
                              Math.max(
                                0,
                                (quantities[item?.id] || item?.quantity) - 1
                              )
                            )
                          }
                        >
                          -
                        </button>

                        <input
                          min={0}
                          name="quantity"
                          type="number"
                          onChange={(e) =>
                            handleInputChange(item?.id, Number(e.target.value))
                          }
                          className="h-9 inline-flex focus:outline-none items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5  text-primary  w-16  count"
                          value={quantities[item.id] || item?.quantity}
                        />
                        <button
                          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-primary text-primary hover:text-white plus"
                          onClick={() =>
                            handleInputChange(
                              item?.id,
                              (quantities[item?.id] || item?.quantity) + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex">
                      <button
                        type="button"
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                        onClick={() => removeCartItem(item?.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <EmptyCart />
          </div>
        )}
      </div>

      {cart?.itemsV2?.items?.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6 z-50 bg-white">
          <div className="flex flex-col space-y-2">
            {cart?.prices?.discounts?.map((discount, index) => (
              <div
                key={index}
                className="flex justify-between text-base font-medium text-gray-900"
              >
                <p className="text-sm text-green-600">{t(discount.label)}</p>

                <p className="text-red-600 font-semibold">
                  -
                  <Price amount={discount?.amount?.value} />
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>{t("Subtotal")}</p>
            <p>
              <Price amount={cart?.prices?.grand_total?.value} />
            </p>
          </div>

          <div className="mt-6">
            <Link
              href={checkOutUrl}
              onClick={() => handleCloseDrawer()}
              prefetch={true}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {t("Checkout")}
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              {t("or")}
              <Link
                prefetch={true}
                onClick={() => handleCloseDrawer()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href={shopUrl}
              >
                {t("ContinueShopping")}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
            <p>
              <Link
                prefetch={true}
                onClick={() => handleCloseDrawer()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href={shopCartUrl}
              >
                {t("ViewShopCart")}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
