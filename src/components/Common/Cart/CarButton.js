import { DRAWER_TYPE } from "@/components/Util/commonFunctions";
import { openDrawer } from "@/lib/redux/slices/drawerSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { CartButtonSvg } from "@/components/SvgFiles/SvgFile";

const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});

export default function CarButton() {
  const { cart_id: cartId, cart } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const handleOpenDrawer = (type, title) => {
    dispatch(openDrawer({ type: type, title: title }));
  };

  const count = cart?.itemsV2?.items?.length || 0;

  return (
    <div
      className="fixed top-[40%] z-20 hidden flex-col bg-primary items-center cursor-pointer justify-center rounded p-3 pt-3.5 text-sm font-semibold text-white shadow transition-colors duration-200 focus:outline-none lg:flex right-0 w-[87.5px] h-[96px]"
      onClick={() => handleOpenDrawer(DRAWER_TYPE.CART, count)}
    >
      <span className="flex pb-0.5">
        <CartButtonSvg />
        <span className="flex ml-2 text-gray-800 font-medium">
          <span className="font-bold">{count}</span> Items
        </span>
      </span>
      {/* Set a minimum height and ensure consistent layout */}
      <span
        className="w-full px-2 py-2 mt-3 rounded bg-white text-black min-h-[2rem] flex items-center justify-center transition-opacity duration-200"
      >
        <Price amount={cart?.prices?.grand_total?.value || 0.0} />
      </span>
    </div>
  );
}
