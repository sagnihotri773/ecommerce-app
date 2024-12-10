"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { getPrice, truncateTitle } from "@/components/Util/commonFunctions";
import { useDebouncedCallback } from "use-debounce";
import {
  removeItemFromCart,
  updateCartItemsQuantity,
} from "@/lib/redux/slices/cartSlice";
import { Minus, Plus, Edit, Trash2 } from "lucide-react";
import { checkOutUrl, shopCartUrl, shopUrl } from "@/components/RouteManager";
import { Link } from "@/components/ui/Link";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import { useRouter } from "next/navigation";
import { GET_PRODUCT } from "@/lib/graphql/queries/products";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { closeDrawer } from "@/lib/redux/slices/drawerSlice";
import dynamic from "next/dynamic";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});

export default function drawer3() {
  const t = useTranslations("ShoppingCart");
  const dispatch = useDispatch();
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});
  const [updateProduct, setUpdateProduct] = useState({});

  const UpdateCartItem = useCallback(
    (id, count) => {
      dispatch(updateCartItemsQuantity({ id, count, cartId }));
    },
    [cartId, dispatch]
  );

  const debouncedUpdateCartItem = useDebouncedCallback((id, count) => {
    UpdateCartItem(id, count);
  }, 500);

  const removeCartItem = (cart_item_id) => {
    dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id }));
  };

  useEffect(() => {
    const initialQuantities = {};
    cart?.itemsV2?.items.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  

  const openProductPopover = async (item) => {
    if (item?.product?.sku !== updateProduct?.sku) {
      const products = await getDynamicData(GET_PRODUCT, {
        sku: item?.product?.sku,
      });
      dispatch(openPopover({ ...products?.products?.items[0], type: "Edit" }));
      setUpdateProduct({ ...products?.products?.items[0], type: "Edit" });
    } else {
      dispatch(openPopover(updateProduct));
    }
  };

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
    <>
      <div className="overflow-y-auto h-[calc(100vh-250px)]">
        {cart?.itemsV2?.items?.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-b">
            <img
              src={item?.product?.image?.url}
              alt={item?.product?.image?.url}
              className="w-20 h-20 object-cover mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">
                {" "}
                {truncateTitle(item?.product?.name)}{" "}
              </h3>
              <p className="text-sm text-gray-500">{item.details}</p>
              <div className="flex items-center mt-2">
                {getPrice(item, "final_price") !==
                getPrice(item, "regular_price") ? (
                  <>
                    <span className="text-gray-500 line-through mr-2">
                      {" "}
                      <Price amount={getPrice(item, "regular_price")} />{" "}
                    </span>{" "}
                    &nbsp;
                    <span className="text-red-500 font-bold">
                      {" "}
                      <Price amount={getPrice(item, "final_price")} />{" "}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">
                    {" "}
                    <Price amount={getPrice(item, "final_price")} />{" "}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2">
                <div className="flex justify-center m-auto min-w-[120px] w-[120px] h-[35px] border border-[var(--bs-border-color)] text-center rounded-[40px] block">
                  <button
                    onClick={() =>
                      handleInputChange(
                        item?.id,
                        Math.max(
                          0,
                          (quantities[item?.id] || item?.quantity) - 1
                        )
                      )
                    }
                    className="text-gray-500 hover:text-gray-700 "
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    min={0}
                    autoFocus
                    name="quantity"
                    type="number"
                    onChange={(e) =>
                      handleInputChange(item?.id, Number(e.target.value))
                    }
                    className="h-8 inline-flex text-base rounded-md focus:outline-none w-10 text-center quantity mx-1"
                    value={quantities[item.id] || item?.quantity}
                  />
                  <button
                    onClick={() =>
                      handleInputChange(
                        item?.id,
                        (quantities[item?.id] || item?.quantity) + 1
                      )
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  className="ml-4 text-gray-500 hover:text-gray-700"
                  onClick={(e) => openProductPopover(item)}
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => removeCartItem(item?.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          {cart?.prices?.discounts?.map((discount, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span className="text-gray-600">{t(discount.label)}</span>
              <span className="text-red-600 font-semibold">
                - <Price amount={discount?.amount?.value} />
              </span>
            </div>
          ))}
          <span className="font-bold">{t("Subtotal")}:</span>
          <span className="font-bold">
            <Price amount={cart?.prices?.grand_total?.value} />
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Taxes, shipping and discounts codes calculated at checkout
        </p>
        <button className="w-full bg-gray-200 text-gray-800 py-2 mb-2 rounded">
          <Link
            onClick={() => handleCloseDrawer()}
            href={checkOutUrl}
            prefetch={true}
          >
            {t("ContinueShopping")}
          </Link>
        </button>
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          <Link
            onClick={() => handleCloseDrawer()}
            href={shopCartUrl}
            prefetch={true}
          >
            {t("ViewShopCart")}
          </Link>
        </button>
      </div>
    </>
  );
}
