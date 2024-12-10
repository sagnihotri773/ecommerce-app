"use client"
import { selectStoreInfo } from "@/lib/redux/slices/storeConfig";
import { useSelector } from "react-redux";

export default function CopyRight({className='text-center'}) {
  const copyright = useSelector((state) => selectStoreInfo(state, "copyright"));

  return <p className={`mb-0 ${className}`}>{copyright}</p>;
}
