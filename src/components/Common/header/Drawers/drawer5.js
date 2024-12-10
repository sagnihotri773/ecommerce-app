import React, { useEffect, useState } from "react";
import { Edit, Minus, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {
  removeItemFromCart,
  updateCartItemsQuantity,
} from "@/lib/redux/slices/cartSlice";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import { GET_PRODUCT } from "@/lib/graphql/queries/products";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { closeDrawer } from "@/lib/redux/slices/drawerSlice";
import Image from "next/image";
import { getPrice, truncateTitle } from "@/components/Util/commonFunctions";
import { useRouter } from "next/navigation";
import { checkOutUrl, shopCartUrl, shopUrl } from "@/components/RouteManager";
import { Link } from "@/components/ui/Link";
import ShoppingBagIcon from "@/components/SvgFiles/SvgFile";
import dynamic from "next/dynamic";
import { useCallback } from "react";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});

export default function drawer5() {
  const t = useTranslations("ShoppingCart");
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    cart_id: cartId,
    cart,
    loading,
  } = useSelector((state) => state.customer);
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
  }, 300);

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

  const Productprice = (item) => {
    return getPrice(item, "final_price") !== getPrice(item, "regular_price") ? (
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
    );
  };

  return (
    <>
      <div className="flex h-full flex-col justify-between overflow-hidden">
        <ul className="flex-grow overflow-auto py-4">
          {cart?.itemsV2?.items?.length > 0 ? (
            cart?.itemsV2?.items?.map((item) => (
              <li
                key={item.id}
                className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
              >
                <div className="relative flex w-full flex-row justify-between py-4">
                  <div className="absolute z-40 -mt-2 ml-[55px]">
                    <button
                      type="submit"
                      className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
                      onClick={() => removeCartItem(item?.id)}
                    >
                      <X />
                    </button>
                    <p className="sr-only" role="status" />
                  </div>

                  <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Image
                      src={item?.product?.image?.url}
                      alt={item?.product?.image?.url}
                      layout="fill"
                      objectFit="contain"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw"
                      className="inset-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col text-base ml-2">
                    <span className="leading-tight">
                      {" "}
                      {truncateTitle(item?.product?.name)}{" "}
                    </span>
                    <button
                      className="mr-3 text-gray-500 hover:text-gray-700"
                      onClick={(e) => openProductPopover(item)}
                    >
                      <Edit size={20} />
                    </button>
                  </div>

                  <div className="flex h-16 flex-col justify-between">
                    <p className="flex justify-end space-y-2 text-right text-sm">
                      <Productprice {...item} />
                    </p>

                    <div className="ml-auto flex h-9 flex-row items-center  rounded-full border border-neutral-200 dark:border-neutral-700">
                      <button
                        type="submit"
                        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"
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
                        <Minus size={20} />
                      </button>
                      <p className="sr-only" role="status" />
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
                        type="submit"
                        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                        onClick={() =>
                          handleInputChange(
                            item?.id,
                            (quantities[item?.id] || item?.quantity) + 1
                          )
                        }
                      >
                        <Plus size={20} />
                      </button>
                      <p className="sr-only" role="status" />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="top-[40%] relative text-center">
              <div className="flex justify-center ">
                <ShoppingBagIcon />
              </div>
              <div className="py-2" onClick={() => router.push(shopUrl)}>
                <button className="border border-[#00C0F3] rounded-[50px] bg-[#009e7f] text-white px-9 py-2 text-xl font-bold">
                  {t("ContinueShopping")}
                </button>
              </div>
            </div>
          )}
        </ul>
        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          {cart?.prices?.discounts?.map((discount, index) => (
            <div
              key={index}
              className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700"
            >
              <p className="text-right text-base text-black dark:text-white">
                {t(discount.label)}
              </p>
              <p className="text-red-600 font-semibold">
                - <Price amount={discount?.amount?.value} />
              </p>
            </div>
          ))}
          <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
            <p>Total</p>
            <p className="text-right text-base text-black dark:text-white">
              <Price amount={cart?.prices?.grand_total?.value} />
            </p>
          </div>
        </div>

        <Link
          type="button"
          onClick={() => handleCloseDrawer()}
          className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
          href={shopUrl}
          prefetch={true}
        >
          {t("ContinueShopping")}
        </Link>
      </div>
    </>
  );
}
