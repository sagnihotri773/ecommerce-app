import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import ProductGallery from "../ProductGallery/main";
// import ProductSummary from "../ProductSummary/main";
import { useSelector } from "react-redux";
// import { renderHtmlDynamic } from "@/components/Util/commonFunctions";
// import ConfigurableProductOptionThree from "./ConfiguableProductOptionThree";
const BundleProduct = dynamic(
  () => import("@/components/Product/BundleProduct"),
  { ssr: false }
);
const ProductSummaryFour = dynamic(
  () => import("@/components/Common/ProductSummary/ProductSummaryFour"),
  { ssr: false }
);
const ConfigurableProductOptionThree = dynamic(
  () => import("@/components/Common/ProductDetail/ConfiguableProductOptionThree"),
  { ssr: false }
);
const SimpleProduct = dynamic(
  () => import("@/components/Product/SimpleProduct"),
  { ssr: false }
);
const DownloadableProduct = dynamic(
  () => import("@/components/Product/DownloadableProduct"),
  { ssr: false }
);
const GroupedProduct = dynamic(
  () => import("@/components/Product/GroupedProduct"),
  { ssr: false }
);

export default function ProductDetailStyleThree({ productsDetails }) {
  const [price, setPrice] = useState("0.00");
  const [stockStatus, setStockStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const componentMap = {
    SimpleProduct: SimpleProduct,
    ConfigurableProduct: ConfigurableProductOptionThree,
    BundleProduct: BundleProduct,
    GroupedProduct: GroupedProduct,
    DownloadableProduct: DownloadableProduct,
  };

  const ProductTypeComponent = componentMap[productsDetails?.__typename];
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  const [getProductGallerName, setGetProductGalleryName] = useState();
  const [productPageData, setProductPageData] = useState(productsDetails);
  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setGetProductGalleryName(
        storeConfigData?.availableStores[0]?.layoutSetting?.product_gallery
      );
      setProductPageData(
        storeConfigData?.availableStores[0]?.staticContent?.productPage
      );
    }
    if (productsDetails?.sku) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  });

  const lastLevelCategory =
    productsDetails?.categories?.length > 0
      ? productsDetails.categories.reduce(
        (max, category) => (category.level > max.level ? category : max),
        { level: -1 }
      )
      : null;

  const cardImages = (
    <div
      className="col-span-2 flex flex-row py-2 md:py-0 md:flex-col gap-2 overflow-hidden h-fit scroll-smooth"
    >
      <div className="md:h-[86px] h-[60px] bg-gray-200 animate-pulse rounded-lg w-[60px] md:w-[86px]" />
      <div className="md:h-[86px] h-[60px] bg-gray-200 animate-pulse rounded-lg w-[60px] md:w-[86px]" />
    </div>
  );

  return (
    <>
      <section className="relative container m-auto p-[10px] md:min-h-[639px]">
        {/* {renderHtmlDynamic(productPageData?.topContent)} */}
        <div className="container m-auto md:mt-[60px] mt-[10px] relative">
          <div
            className={`gap-8 ${getProductGallerName === "ProductGalleryFive"
              ? "flex md:flex-row flex-col"
              : "grid grid-cols-1 md:grid-cols-2"
              }`}
          >
            <div className="md:sticky top-20 h-fit">
            <ProductGallery productsDetails={productsDetails} loading={isLoading} />
              {/* {!isLoading ? <ProductGallery productsDetails={productsDetails} loading={isLoading} />
                : <div className={`${!isMobile ? 'flex': ''} gap-4`}>
                  <div className="md:block hidden">{cardImages}</div> 
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 md:h-[639px] w-full">
                    <button className="absolute top-4 right-4 p-2 ">
                      <div className="h-11 w-11 bg-gray-300 rounded bg-white animate-pulse"></div>
                    </button>
                  </div>
                  <div className="md:hidden block">{cardImages}</div> 
                  
                </div>
              } */}
            </div>
            <div className="space-y-6">
              {isLoading ?
                <>
                  <h1 className="text-3xl font-bold"> <div className="h-6 w-80 bg-gray-300 rounded  animate-pulse"></div></h1>
                  <div className="mt-4">
                    <span className="text-3xl font-bold"><div className="h-10 w-36 bg-gray-300 rounded  animate-pulse"></div></span>
                  </div>
                  <p className="mt-8 text-sm text-gray-500">
                    <div className="w-3/5 h-4 bg-gray-300 animate-pulse rounded" ></div>
                  </p>

                  <div className="space-y-4">
                    <div className="h-6 w-24 bg-gray-300 rounded  animate-pulse"></div>
                    <div className="h-16 w-44 bg-gray-300 rounded  animate-pulse"></div>

                    <div className="h-14 w-50 bg-gray-300 rounded  animate-pulse"></div>

                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-gray-300 rounded  animate-pulse"></div>
                      <div className="h-10 w-16 bg-gray-300 rounded  animate-pulse"></div>

                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-44 bg-gray-300 rounded  animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-44 bg-gray-300 rounded  animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-44 bg-gray-300 rounded  animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className="text-3xl font-bold text-gray-900 ">
                    <ProductSummaryFour
                      data={productsDetails}
                      price={price}
                      stockStatus={stockStatus}
                    />
                  </div>
                  {ProductTypeComponent && (
                    <ProductTypeComponent
                      data={productsDetails}
                      priceFunction={setPrice}
                      setStockStatus={setStockStatus}
                    />
                  )}
                </>
              }
              {!isLoading && <>
                {productsDetails?.sku ? (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600">Sku:</p>
                      <p className="font-bold">{productsDetails.sku}</p>
                    </div>
                  </div>
                ) :
                  <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" ></div>}
                {productsDetails?.stock_status ? (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600">Availability:</p>
                      <p className="font-bold">
                        {productsDetails?.stock_status}
                      </p>
                    </div>
                  </div>
                ) : <div className="w-44 h-6 bg-gray-300 animate-pulse rounded" ></div>}
                {lastLevelCategory && (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600">Category:</p>
                      <p className="font-bold">{lastLevelCategory?.name}</p>
                    </div>
                  </div>
                )}
              </>}
              {/* <div className="w-32 h-6 bg-gray-300 animate-pulse rounded" ></div> */}
              <div className="h-[2px] bg-[#e3e3e3]"></div>
              {/* {renderHtmlDynamic(productPageData?.afterMainContent)} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
