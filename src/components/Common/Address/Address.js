import React from "react";
import { EditSvg, LocationPin, PhoneSvg } from "@/components/SvgFiles/SvgFile";
import { showAddress } from "./Extra";

export default function ShippingBillingAddresses({
  data,
  callback,
  title,
  showHide = true,
  className="w-full h-fit rounded-[8px] border border-[#CACBCF] shadow py-4 px-5 mt-4"
}) {  
  // console.log("data" ,data);
  
  return showHide ? (
    <div
      className={className}
    >
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
        <div>
          <div className="flex items-center mb-2 mt-3 justify-between">
            <h5 className="text-2xl font-medium"> {title} </h5>
            <button
              className="text-primary text-lg"
              onClick={(e) => callback()}
            >
              <EditSvg />
            </button>
          </div>
          <div className="pt-4 dark:border-gray-700">
            <p className="text-lg font-medium mb-2">
              {" "}
              {data?.firstname} {data?.lastname}{" "}
            </p>
            <ul className="list-none">
              <li className="flex ms-0">
                <LocationPin className="mt-1 mr-2" />
                <p className="text-slate-400 w-3/5">
                  {showAddress(data, "street")} {showAddress(data, "city")}{" "}
                  {showAddress(data, "country_code")}{" "}
                  {/* {showAddress(typeof data?.region == 'object' && [null].includes(data?.region) ? data?.region : data , 'region')} */}
                  {showAddress(data, "postcode")}
                </p>
              </li>
              <li className="flex ms-0 mt-1">
                <PhoneSvg className="mt-1 mr-2" />
                <p className="text-slate-400"> {data?.telephone} </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
