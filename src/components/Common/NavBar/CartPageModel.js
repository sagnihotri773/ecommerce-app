"use client";
import ProductsPopover from "@/components/Product/ProductsPopover";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CartDrawerOne = dynamic(() => import('@/components/Common/header/Drawers/drawer1'), { ssr: false });
const CartDrawerTwo = dynamic(() => import('@/components/Common/header/Drawers/drawer2'), { ssr: false });
const CartDrawerThree = dynamic(() => import('@/components/Common/header/Drawers/drawer3'), { ssr: false });
const CartDrawerFour = dynamic(() => import('@/components/Common/header/Drawers/drawer4'), { ssr: false });
const CartDrawerFive = dynamic(() => import('@/components/Common/header/Drawers/drawer5'), { ssr: false });
const DrawerLayout = dynamic(() => import('@/components/Common/DrawerLayout/Drawer'), { ssr: false });

const cartDrawerComponents = {
  CartDrawerOne,
  CartDrawerTwo,
  CartDrawerThree,
  CartDrawerFour,
  CartDrawerFive,
};

export default function CartPageModel() {
  const [drawerName, setDrawerName] = useState('');
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setDrawerName(storeConfigData?.availableStores[0]?.layoutSetting?.cart_drawer || "CartDrawerOne");
    }
  }, [storeConfigData?.availableStores]);

  const SelectedDrawer = cartDrawerComponents[drawerName] || CartDrawerOne;
  return (
    <>
      <DrawerLayout>
        <SelectedDrawer />
      </DrawerLayout>
      <ProductsPopover />
    </>
  );
};