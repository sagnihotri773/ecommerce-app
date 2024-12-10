import React from "react";
import { ViewProductDetailSvg } from "@/components/SvgFiles/SvgFile";
import { Link } from "@/components/ui/Link";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import { truncateTitle } from "../Util/commonFunctions";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});
const HoverAddToCartButtonV2 = dynamic(
  () => import("@/components/Util/Button/HoverAddToCartButtonV2"),
  { ssr: false }
);
const HoverAddToWishlistV2 = dynamic(
  () => import("@/components/Util/Button/HoverAddToWishlistV2"),
  { ssr: false }
);
const RatingComponent = dynamic(
  () => import("@/components/Common/Rating/Rating"),
  { ssr: false }
);

export default function ProductCardTwo({ products }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const openProductPopover = () => {
    dispatch(openPopover(products));
  };
  return (
    <div className="group ">
      <div className="relative  cursor-pointer overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md transition-all duration-700 ease-in-out">
        <img
          src={products?.image?.url}
          className="w-full transition-opacity duration-700 opacity-100 group-hover:opacity-0"
          alt={products?.name}
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        />
        <img
          src={products?.thumbnail?.url}
          className="w-full absolute inset-0 transition-opacity duration-700 delay-200 opacity-0 group-hover:opacity-100"
          alt={products?.name}
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        />

        <div className="absolute flex w-full transition-all duration-700 delay-200 ease-in-out -bottom-20 group-hover:bottom-0 start-0 end-3 justify-between items-center ">
          <HoverAddToWishlistV2 products={products} />

          <div className="flex-1 flex justify-center">
            <HoverAddToCartButtonV2
              products={products}
              className="w-full text-center"
            />
          </div>

          <button
            className="bg-primary hover:bg-black w-[48px] text-white border-l border-l-white flex items-center justify-center h-12"
            onClick={(e) => openProductPopover()}
          >
            <ViewProductDetailSvg />
          </button>
        </div>

        {products?.price_range?.minimum_price?.discount?.percent_off > 0 && (
          <ul className="list-none absolute top-[10px] end-4">
            <li>
              <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-2 rounded h-5 transition-all duration-500 ease-in-out">
                {products?.price_range?.minimum_price?.discount?.percent_off ||
                  0}{" "}
                % Off
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className="mt-4 w-full text-center">
        <Link
          title={products?.name}
          className="hover:text-[#a749ff] cursor-pointer text-lg font-medium transition-all duration-500"
          href={`/${products?.url_rewrites?.[0]?.url}`}
          prefetch={true}
        >
          {truncateTitle(products?.name)}
        </Link>
        <div>
          <RatingComponent value={products?.rating_summary || 0} />
        </div>
        <div className="flex w-full text-center justify-center items-center mt-1">
          <p>
            <Price
              amount={
                products?.price_range?.minimum_price?.final_price?.value ||
                products?.price_range?.minimum_price?.regular_price?.value
              }
            />
            {products?.price_range?.minimum_price?.regular_price?.value !==
            products?.price_range?.minimum_price?.final_price?.value ? (
              <del className="text-slate-400 pl-3">
                <Price
                  amount={
                    products?.price_range?.minimum_price?.regular_price?.value
                  }
                />
              </del>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
