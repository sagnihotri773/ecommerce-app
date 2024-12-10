import { useState } from "react";
import HoverAddToWishlistV3 from "@/components/Util/Button/HoverAddToWishlistV3";
import {
  descriptionRender,
  getProductsPrice,
  truncateTitle,
} from "@/components/Util/commonFunctions";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import ProductsPopoverStyleTwo from "../Popover/PopOverStyleTwo";
import { useRouter } from "next/navigation";
import AddToCartV5 from "@/components/Util/Button/AddToCartV5";
import { QuikViewSvg } from "@/components/SvgFiles/SvgFile";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product?.image?.url);

  const openProductPopover = () => {
    const products = { ...product };
    dispatch(openPopover(products));
  };

  return (
    <div className="flex flex-col md:flex-row items-center border rounded-lg overflow-hidden cursor-pointer">
      <div className="relative aspect-[3/3] group bg-gray-100 md:w-1/3 group">
        {/* Display the selected image */}
        <Image
          src={selectedImage}
          alt={product?.name}
          fill
          className="object-cover transition-opacity duration-1000 border group-hover:opacity-0"
          priority
          onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
        />
<Image
          src={product?.thumbnail?.url}
          alt={product?.name}
          fill
          className="absolute top-0 left-0 object-cover opacity-0 border transition-opacity duration-1000 group-hover:opacity-100"
          priority
          onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
        />
        {product?.price_range?.minimum_price?.discount?.percent_off > 0 && (
          <ul className="list-none absolute top-[10px] start-4 py-2">
            <li>
              <span className="bg-primary text-white text-lg px-2.5 py-3 rounded h-7">
                {product?.price_range?.minimum_price?.discount?.percent_off || 0}%
              </span>
            </li>
          </ul>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div className="space-y-4">
          <h3
            className="text-base text-[#111111] font-[400] hover:text-secondary transition-colors"
            onClick={() => router.push(`/${product?.url_rewrites?.[0]?.url}`)}
          >
            {product?.name}
          </h3>
          <div
            className="my-2 text-[#444444] text-sm font-[300]"
            dangerouslySetInnerHTML={{
              __html: descriptionRender(
                truncateTitle(product?.description?.html, 250)
              ),
            }}
          ></div>

          <p className="text-lg font-semibold text-black">
            {getProductsPrice({ products: product })}
          </p>
        </div>

        {/* Thumbnail Images */}
        <div className="flex mt-4 gap-2">
          {product?.media_gallery?.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer"
              onClick={() => setSelectedImage(item?.url)} // Set selected image on click
            >
              <img
                src={item?.url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[30px] h-[30px] p-1 border ${
                  selectedImage === item?.url ? "border-black" : ""
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 space-x-4 flex items-center">
          <AddToCartV5 products={product} />
          <div className="flex gap-2">
            <HoverAddToWishlistV3 />
            <button
              className="w-14 h-14 flex items-center justify-center border-[2px] border-black border-solid transition-colors"
              aria-label="Quick view"
              onClick={openProductPopover}
            >
              <QuikViewSvg />
            </button>
          </div>
          <ProductsPopoverStyleTwo />
        </div>
      </div>
    </div>
  );
}
