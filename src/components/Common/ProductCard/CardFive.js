import { useDispatch } from "react-redux";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import { getProductsPrice } from "@/components/Util/commonFunctions";

import dynamic from 'next/dynamic';
const HoverAddToCartButton = dynamic(() => import('@/components/Util/Button/HoverAddToCartButton'), { ssr: false });
const HoverAddToWishlist = dynamic(() => import('@/components/Util/Button/HoverAddToWishlist'), { ssr: false });
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });

export default function  CardFive ({ products }) {
  
  const dispatch = useDispatch();
  const openProductPopover = () => {
    dispatch(openPopover(products));
  };
  return (
    <div className="max-w-sm mx-auto border h-[435px] rounded-lg shadow-md overflow-hidden bg-white cursor-pointer group">
      <div className="relative">
        <img
          src={products?.image?.url}
          alt="Florist Table Lamp"
          className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        <span
          className="hidden group-hover:block absolute bottom-0 right-0 m-2 p-1 bg-white text-xs font-semibold uppercase tracking-wide text-gray-700 border border-gray-300 rounded-lg rotate-45 transform origin-bottom-left"
          onClick={() => openProductPopover()}
        >
          Quick View
        </span>

        <div className="absolute top-0 left-0 m-2 hidden group-hover:block">
          <HoverAddToWishlist products={products} />
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {products?.name}
        </h3>
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-1 text-yellow-500">
            <RatingComponent value={products?.rating_summary || 0} />
          </div>
        </div>

        <p className="mt-2 text-xl font-bold text-gray-900">
          {getProductsPrice({ products })}
        </p>

        <div className="hidden group-hover:block mt-3">
          <HoverAddToCartButton products={products} />
        </div>
      </div>
    </div>
  );
};
