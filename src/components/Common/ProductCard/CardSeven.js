// import HoverAddToWishlist from "@/components/Util/Button/HoverAddToWishlist";
import { useRouter } from "next/navigation";
import { getProductsPrice } from "@/components/Util/commonFunctions";

import dynamic from 'next/dynamic'
const HoverAddToWishlist = dynamic(() => import('@/components/Util/Button/HoverAddToWishlist'), { ssr: false });

export default function CardSeven ({ products }) {
  const router = useRouter();
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden cursor-pointer">
      <div className="relative group">
        <img
          src={products?.image?.url}
          alt="BOSS Bodywear dressing gown in black"
          className="w-full h-96 object-cover group-hover:hidden block"
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        />
        <img
          src={products?.thumbnail?.url || products?.image?.url}
          alt="BOSS Bodywear dressing gown in black"
          className="w-full h-96 object-cover hidden group-hover:block"
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        />
        <button className="absolute right-2 bottom-2  p-2 rounded-full ">
          <HoverAddToWishlist products={products} />
        </button>
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-medium text-gray-900 mb-2"
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        >
          {products?.name}
        </h3>
        <p className="text-lg font-semibold text-gray-700">
          {getProductsPrice({ products })}
        </p>
      </div>
    </div>
  );
};
