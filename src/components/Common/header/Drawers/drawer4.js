import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { getPrice } from "@/components/Util/commonFunctions";
import { useRouter } from "next/navigation";
import { checkOutUrl, shopCartUrl, shopUrl } from "@/components/RouteManager";
import ShoppingBagIcon from "@/components/SvgFiles/SvgFile";
import { Link } from "@/components/ui/Link";

import dynamic from "next/dynamic";
import { ConfigOption } from "@/components/Cart/Common";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});

export default function Drawer4() {
  const t = useTranslations("ShoppingCart");
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    cart_id: cartId,
    cart,
    loading,
  } = useSelector((state) => state.customer);
  const [quantities, setQuantities] = useState({});
  const [updateProduct, setUpdateProduct] = useState(null);

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

  const UpdateCartItem = useCallback(
    (id, count) => {
      dispatch(updateCartItemsQuantity({ id, count, cartId }));
    },
    [cartId, dispatch]
  );

  const debouncedUpdateCartItem = useDebouncedCallback((id, count) => {
    UpdateCartItem(id, count);
  }, 500);

  const removeCartItem = useCallback(
    (cart_item_id) => {
      dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id }));
    },
    [cartId, dispatch]
  );

  const openProductPopover = useCallback(
    async (item) => {
      if (item?.product?.sku !== updateProduct?.sku) {
        const products = await getDynamicData(GET_PRODUCT, {
          sku: item?.product?.sku,
        });
        const productData = products?.products?.items[0];
        dispatch(openPopover({ ...productData, type: "Edit" }));
        setUpdateProduct({ ...productData, type: "Edit" });
      } else {
        dispatch(openPopover(updateProduct));
      }
    },
    [updateProduct, dispatch]
  );

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const ProductPrice = useMemo(() => {
    return (item) =>
      getPrice(item, "final_price") !== getPrice(item, "regular_price") ? (
        <>
          <span className="text-gray-500 line-through mr-2">
            <Price amount={getPrice(item, "regular_price")} />
          </span>{" "}
          &nbsp;
          <span className="text-red-500 font-bold">
            <Price amount={getPrice(item, "final_price")} />
          </span>
        </>
      ) : (
        <span className="font-bold">
          <Price amount={getPrice(item, "final_price")} />
        </span>
      );
  }, []);

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
    <section className="relative flex h-full flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto">
        {cartItems.length > 0
          ? cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-solid border-border-200 border-opacity-75 py-4 text-sm"
              style={{ opacity: 1 }}
            >
              <div className="flex-shrink-0">
                <div className="flex overflow-hidden flex-col-reverse items-center w-8 h-24 bg-gray-100 text-heading rounded-full">
                  <button
                    className="cursor-pointer p-2 hover:bg-accent-hover focus:outline-none"
                    onClick={() =>
                      handleInputChange(
                        item?.id,
                        Math.max(0, (quantities[item?.id] || item?.quantity) - 1)
                      )
                    }
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    min={0}
                    name="quantity"
                    type="number"
                    className="h-9 text-center rounded-md w-10 mx-1 focus:outline-none"
                    onChange={(e) =>
                      handleInputChange(item?.id, Number(e.target.value))
                    }
                    // className="h-9 inline-flex text-base rounded-md focus:outline-none w-10 text-center quantity mx-1"
                    value={quantities[item.id] || item?.quantity}
                  />
                  <button
                    className="cursor-pointer p-2 hover:bg-accent-hover focus:outline-none"
                    onClick={() =>
                      handleInputChange(
                        item?.id,
                        (quantities[item?.id] || item?.quantity) + 1
                      )
                    }
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className="mx-4 flex-shrink-0 relative h-10 w-10 sm:h-16 sm:w-16">
                <Image
                  src={item?.product?.image?.url}
                  alt={item?.product?.name}
                  layout="fill"
                  objectFit="contain"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw"
                  // className="inset-0"
                  className="rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold text-heading">
                  <ConfigOption product={item} />
                </h3>
                <p className="my-2.5 font-semibold text-accent">
                  <ProductPrice {...item} />
                </p>
                <span className="text-xs text-body">
                  {" "}
                  {quantities[item.id] || item.quantity} X{" "}
                  {getPrice(item, "final_price")}{" "}
                </span>
              </div>
              <span className="font-bold text-heading ltr:ml-auto rtl:mr-auto text-[#23ac91]">
                <Price
                  amount={
                    getPrice(item, "final_price") *
                    (quantities[item.id] || item.quantity)
                  }
                />
              </span>
              <button
                className="ml-4 text-gray-500 hover:text-gray-700"
                onClick={() => openProductPopover(item)}
              >
                <Edit size={20} />
              </button>
              <button
                className="ml-3 text-gray-500 hover:text-red-600"
                onClick={() => removeCartItem(item.id)}
              >
                <span className="sr-only">close</span>
                <X />
              </button>
            </div>
          ))
          : !loading && (
            <div className="top-[40%] relative text-center">
              <div className="flex justify-center">
                <ShoppingBagIcon />
              </div>
              <div className="py-2" onClick={() => {handleCloseDrawer(); router.push(shopUrl)}}>
                <button className="mt-4 border rounded-[50px] bg-[#009e7f] text-white px-9 py-2 text-xl font-bold">
                  {t("ContinueShopping")}
                </button>
              </div>
            </div>
          )}
      </div>

      {cart?.itemsV2?.items?.length > 0 ? (
        <div className="sticky bottom-0 rounded-t-lg">
          {cart?.prices?.discounts?.map((discount, index) => (
            <div
              key={index}
              className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700"
            >
              <p className="text-right text-base text-black dark:text-white">
                {discount?.label}
              </p>
              <p className="text-red-600 font-semibold">
                - <Price amount={discount?.amount?.value} />
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 p-4 bg-primary rounded-full w-full max-w-md">
            <button
              className="text-white font-semibold py-2 px-6 rounded-full hover:bg-primary transition duration-200 border"
              onClick={() => {
                handleCloseDrawer();
                router.push(checkOutUrl);
              }}
            >
              {t("Checkout")}
            </button>
            <div className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full">
              <Price amount={cart?.prices?.grand_total?.value} />
            </div>
          </div>

          <button className="w-full text-gray-700 py-2 mt-2 rounded-md transition">
            <Link
              onClick={() => handleCloseDrawer()}
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href={shopUrl}
              prefetch={true}
            >
              {t("ContinueShopping")}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
            {t("or")}
            <Link
              onClick={() => handleCloseDrawer()}
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href={shopCartUrl}
              prefetch={true}
            >
              {t("ViewShopCart")}
            </Link>
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
