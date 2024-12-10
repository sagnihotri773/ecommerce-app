"use client";
import React, { useEffect } from "react";
import Plan from "./Plan";
import SubmitButton from "@/components/Util/Button/SubmitButton";
import { DeleteSvg } from "../SvgFiles/SvgFile";
import visaCardImage from "@/assets/payments-types/visa-cart.png";
import expressCardImage from "@/assets/payments-types/express-cart.png";
import discoverCardImage from "@/assets/payments-types/discover-cart.png";
import masterCardImage from "@/assets/payments-types/master-cart.png";
import { useMutation } from "@apollo/client";
import { LIST_PAYMENT_METHODS } from "@/lib/graphql/queries/checkout";
export default function Payment() {
  const [listStripePaymentMethods,{loading,data,error}]=useMutation(LIST_PAYMENT_METHODS)
  useEffect(() => {
    listStripePaymentMethods();
  }, [listStripePaymentMethods]);

  return (
    <>
      <Plan />
      <div className="rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-xl font-semibold">Payment Methods</h5>
          <p className="text-slate-400 mt-2">
            Primary payment method is used by default
          </p>
        </div>
        <div className="px-6">
          <ul>
            <li className="flex justify-between items-center py-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={visaCardImage?.src}
                  className="rounded shadow dark:shadow-gray-800 w-12"
                  alt=""
                />
                <div className="ms-3">
                  <p className="font-semibold">Visa ending in 4578</p>
                  <p className="text-slate-400 text-sm">
                    Expires in 13/03/2024
                  </p>
                </div>
              </div>
              <div>
                <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full">
                  <DeleteSvg />
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center py-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={expressCardImage?.src}
                  className="rounded shadow dark:shadow-gray-800 w-12"
                  alt=""
                />
                <div className="ms-3">
                  <p className="font-semibold">
                    American Express ending in 4578
                  </p>
                  <p className="text-slate-400 text-sm">
                    Expires in 05/05/2024
                  </p>
                </div>
              </div>
              <div>
                <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full">
                  <DeleteSvg />
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center py-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={discoverCardImage?.src}
                  className="rounded shadow dark:shadow-gray-800 w-12"
                  alt=""
                />
                <div className="ms-3">
                  <p className="font-semibold">Discover ending in 4578</p>
                  <p className="text-slate-400 text-sm">
                    Expires in 19/07/2024
                  </p>
                </div>
              </div>
              <div>
                <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full">
                  <DeleteSvg />
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center py-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={masterCardImage?.src}
                  className="rounded shadow dark:shadow-gray-800 w-12"
                  alt=""
                />
                <div className="ms-3">
                  <p className="font-semibold">Master Card ending in 4578</p>
                  <p className="text-slate-400 text-sm">
                    Expires in 20/07/2024
                  </p>
                </div>
              </div>
              <div>
                <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full">
                  <DeleteSvg />
                </span>
              </div>
            </li>
            <li className="py-6 border-t border-gray-100 dark:border-gray-700">
              <SubmitButton title={"Add Payment Method"} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
