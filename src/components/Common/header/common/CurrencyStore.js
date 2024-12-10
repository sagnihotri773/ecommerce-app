"use client";
import React, { useEffect, useState } from "react";
import SimpleSelect from "@/components/Util/Form/switchCurrency";
// import { SelectStore } from "@/components/Util/Form/switchStore";
import { setCurrency } from "@/lib/redux/slices/currency";
import { currentStoreCode } from "@/components/Util/commonFunctions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { selectCurrencyData } from "@/lib/redux/slices/storeConfig";

export default function CurrencyStore({isScrolled= false, className=false}) {
  const [cur, setCur] = useState("USD");
  const [selectedStore, setSelectedStore] = useState("default");
  // const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
  const currencyData = useSelector(selectCurrencyData);

  useEffect(() => {
    setCur(localStorage.getItem("currency") || "USD");
    setSelectedStore(currentStoreCode);
  }, []);
  const dispatch = useDispatch();
  

  const CURRENCY = currencyData?.available_currency_codes || null;

  const selectCurrency = (value) => {
    setCur(value);
    dispatch(setCurrency(value));
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", value);
    }
  };

  // const handleStoreChange = (event) => {
  //   const newValue = event.target.value;
  //   setSelectedStore(newValue);
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("selectedStore", newValue);
  //   }
  //   Cookies.set(
  //     "locale",
  //     storeConfigData?.availableStores?.find(
  //       (item) => item.store_code === newValue
  //     )?.locale,
  //     { expires: 1 }
  //   ); // Expires in 1 day
  //   window.location.reload();
  // };

  return (
    <>
      {/* <div className='md:hidden block'> */}
      {!isScrolled &&  
        <div className="flex mx-[2px] py-1">
          <Image
            src={`https://flagcdn.com/w320/${cur?.slice(0, 2).toLowerCase()}.png`}
            alt={"flag"}
            width={34}
            height={34}
            layout="intrinsic"
          />
        </div>
      }
      {/* </div> */}
      { CURRENCY?.length ? (
        <>
          <div className={`${!isScrolled ? "md:hidden block" : "hidden md:block"}`}>
            <SimpleSelect
              data={currencyData}
              value={cur}
              onSelect={selectCurrency}
              className={className}
            />
          </div>
        </>
      ) : [null].includes(CURRENCY) ?  <div className="w-16 mt-1 h-5 bg-gray-300 animate-pulse min-h-[20px]"></div>  : '' }
      
      {/* {storeConfigData?.length > 1 && (
        <div className="hidden md:block !ml-9 text-white">
          <SelectStore
            selectedStore={selectedStore}
            handleStoreChange={handleStoreChange}
            storeConfigData={storeConfigData}
          />
        </div>
      )} */}
    </>
  );
}
