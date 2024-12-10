import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import ProductGallery from "../ProductGallery/main";
import ProductSummary from "../ProductSummary/main";
import { useSelector } from "react-redux";
import { renderHtmlDynamic } from "@/components/Util/commonFunctions";
import { ShareProduct } from "../ShareProduct/ShareProduct";
const BundleProduct = dynamic(
  () => import("@/components/Product/BundleProduct"),
  { ssr: false }
);
const ConfigurableProductOptionTwo = dynamic(
  () =>
    import("@/components/Common/ProductDetail/ConfigurableProductOptionTwo"),
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

export default function ProductDetailTwo({ productsDetails }) {
  const [price, setPrice] = useState("0.00");
  const [stockStatus, setStockStatus] = useState("");

  const componentMap = {
    SimpleProduct: SimpleProduct,
    ConfigurableProduct: ConfigurableProductOptionTwo,
    BundleProduct: BundleProduct,
    GroupedProduct: GroupedProduct,
    DownloadableProduct: DownloadableProduct,
  };

  const ProductTypeComponent = componentMap[productsDetails?.__typename];
  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  const [getProductGallerName, setGetProductGalleryName] = useState()
  const [productPageData, setProductPageData] = useState(productsDetails);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setGetProductGalleryName(storeConfigData?.availableStores[0]?.layoutSetting?.product_gallery)
      setProductPageData(storeConfigData?.availableStores[0]?.staticContent?.productPage);
    }
  })
  return (
    <>
    <section className="relative">
    {/* {renderHtmlDynamic(productPageData?.topContent)} */}
      <div className="container m-auto px-4 mt-20 relative">
        <div
          className={`gap-8 ${getProductGallerName === "ProductGalleryFive"
              ? "flex md:flex-row flex-col"
              : "grid grid-cols-1 md:grid-cols-2"
            }`}
        >
          <ProductGallery productsDetails={productsDetails} />
          <div className="space-y-6 sticky top-20 md:h-full md:max-h-screen ">
            <div className="text-3xl font-bold text-gray-900 border-b border-b-gray-400">
              <ProductSummary
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

      {/* {renderHtmlDynamic(productPageData?.afterMainContent)} */}
      <div className="pb-5">

      <ShareProduct />
      </div>

            {/* <ProductOtherDetailsTabThree productsDetails={productsDetails} /> */}
          </div>
        </div>
      </div>
      
      </section>
      {/* <ProductDeatilsTab data={productsDetails} /> */}
    </>
  );
}
