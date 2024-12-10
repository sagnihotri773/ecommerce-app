"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { descriptionRender, renderHtmlDynamic } from "@/components/Util/commonFunctions";
import dynamic from 'next/dynamic' 
const NewSletter = dynamic(() => import('./newSletter'), { ssr: false });
const BackToTop = dynamic(() => import('./backToTop'), { ssr: false });

export default function Index() {
  const [footerData, setFooterData] = useState({});
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setFooterData(storeConfigData?.availableStores[0]?.staticContent?.footer);
    }
  }, [storeConfigData?.availableStores])


  return (
     <footer className="footer bg-[#141c27f5] text-gray-200 dark:text-gray-200 px-5 mt-auto">
        <div className="container m-auto relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[60px] px-8">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                  {renderHtmlDynamic(footerData?.middleSection1, "lg:col-span-3 md:col-span-4")}
                  {renderHtmlDynamic(footerData?.middleSection2, "lg:col-span-6 md:col-span-12")}
                  {/* <NewSletter /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            {renderHtmlDynamic(footerData?.middleSection3)}
          </div>
        </div>
        <BackToTop />
      </footer>
  );
}
