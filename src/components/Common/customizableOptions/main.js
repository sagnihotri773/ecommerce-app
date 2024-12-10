"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CustomizableOptionOne = dynamic(() => import("./CustomizableOptionOne"), {
  ssr: false,
});
const CustomizableOptionTwo = dynamic(() => import("./CustomizableOptionTwo"), {
  ssr: false,
});
const customizeOption = {
  CustomizableOptionOne,
  CustomizableOptionTwo,
};

export default function CustomizeOptions({
  product,
  errorMessages,
  selectedOptions,
  handleOptionChange,
}) {
  const [customizeOptionName, setCustomizeOptionName] = useState("");
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setCustomizeOptionName(
        storeConfigData?.availableStores[0]?.layoutSetting
          ?.customizable_options || "CustomizableOptionOne"
      );
    }
  }, [storeConfigData?.availableStores]);
  const SelectedCustomizeOption =
    customizeOption[customizeOptionName] || CustomizableOptionOne;

  return (
    <>
      <SelectedCustomizeOption
        product={product}
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
        errorMessages={errorMessages}
      />
    </>
  );
}
