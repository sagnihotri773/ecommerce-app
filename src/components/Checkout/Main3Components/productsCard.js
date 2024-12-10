import ShoppingBagIcon from "@/components/SvgFiles/SvgFile";
import { getPrice, truncateTitle } from "@/components/Util/commonFunctions";
import {
  removeItemFromCart,
  updateCartItemsQuantity,
} from "@/lib/redux/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import dynamic from "next/dynamic";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});
const RatingComponent = dynamic(
  () => import("@/components/Common/Rating/Rating"),
  { ssr: false }
);

export default function productsCard(props) {
  const t = useTranslations("ShoppingCart");
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const {
    cart_id: cartId,
    cart,
    loading,
  } = useSelector((state) => state.customer);

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

  const Productprice = (item) => {
    return getPrice(item, "final_price") !== getPrice(item, "regular_price") ? (
      <>
        <span className="new-price font-Poppins text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem] text-[15px]">
          <Price amount={getPrice(item, "final_price")} />
        </span>
        &nbsp;
        <span className="old-price ml-[10px] font-Poppins text-[#777] font-semibold leading-[26px] tracking-[0.02rem] text-[15px] line-through">
          <Price amount={getPrice(item, "regular_price")} />
        </span>
      </>
    ) : (
      <span className="font-bold">
        <Price amount={getPrice(item, "final_price")} />
      </span>
    );
  };

  return cart?.itemsV2?.items?.length > 0 ? (
    cart?.itemsV2?.items?.map((item) => (
      <>
        <div className="pro-items p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] gap-5 ">
          <div className="image mr-[15px] max-[420px]:mr-[0] max-[420px]:mb-[15px]">
            <img
              src={item?.product?.image?.url}
              alt={item?.product?.image?.url}
              className="max-w-max w-[100px] h-[100px] border-[1px] border-solid border-[#eee] rounded-[20px] max-[1399px]:h-[80px] max-[1399px]:w-[80px]"
            />
          </div>
          <div className="items-contact">
            <h4 className="text-[16px]">
              <a
                href="javascript:void(0)"
                className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
              >
                {truncateTitle(item?.product?.name)}
              </a>
            </h4>
            <span className="bb-pro-rating flex">
              <RatingComponent value={5} />
            </span>
            <div className="inner-price flex items-center justify-left mb-[4px]">
              <Productprice {...item} />
            </div>
            <div className="flex items-center justify-left w-8 bg-gray-100 text-heading rounded-full">
              <button
                className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100"
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
                onChange={(e) =>
                  handleInputChange(item?.id, Number(e.target.value))
                }
                className="h-8 inline-flex text-base rounded-md focus:outline-none w-10 text-center quantity mx-1 bg-gray-100"
                value={quantities[item.id] || item?.quantity}
              />
              <button
                className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100"
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
        </div>
      </>
    ))
  ) : !loading ? (
    <div className="top-[40%] relative text-center">
      <div className="flex justify-center ">
        <ShoppingBagIcon />
      </div>
    </div>
  ) : (
    ""
  );
}
