"use client";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import { ViewProductDetailSvg } from "@/components/SvgFiles/SvgFile";
import { useDispatch } from "react-redux";
import { openPopover } from "@/lib/redux/slices/popOverSlice";
import dynamic from 'next/dynamic'
import { truncateTitle } from "@/components/Util/commonFunctions";
const HoverAddToCartButton = dynamic(() => import('@/components/Util/Button/HoverAddToCartButton'), { ssr: false });
const HoverAddToWishlist = dynamic(() => import('@/components/Util/Button/HoverAddToWishlist'), { ssr: false });
const RatingComponent = dynamic(() => import('../Rating/Rating'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function productCards({ products }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const openProductPopover = () => {
    dispatch(openPopover(products));
  };
  return (
    <div className="group" key={products.id}>
      <div className="relative w-fit cursor-pointer overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500 ">
        <Image
          width={366}
          height={298}
          src={products?.image?.url}
          className="group-hover:scale-110 duration-500 md:min-h-[297px] md:max-h-[298px]"
          alt=""
          layout="fixed"
          loading="lazy"
          onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
        />
        <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
          <HoverAddToCartButton products={products} className="w-full" />
        </div>
        <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
          <li>
            <HoverAddToWishlist products={products} />
          </li>
          <li className="mt-1 ms-0">
            <span
              className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
              onClick={(e) => openProductPopover()}
            >
              <ViewProductDetailSvg />
            </span>
          </li>
        </ul>
        {products?.price_range?.minimum_price?.discount?.percent_off > 0 && (
          <ul className="list-none absolute top-[10px] start-4">
            <li>
              <span className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-2 rounded h-5">
                {products?.price_range?.minimum_price?.discount?.percent_off ||
                  0}{" "}
                % Off
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className="mt-4 w-fit">
        <Link
          prefetch={true}
          className="hover:text-primary text-lg font-medium"
          href={`/${products?.url_rewrites?.[0]?.url}`}
          // as={`/${products?.url_rewrites?.[0]?.url}`}
        >
          {truncateTitle(products.name)}
        </Link>
        <div className="md:flex justify-between items-center mt-1">
          <p>
            <Price
              amount={
                products?.price_range?.minimum_price?.final_price?.value ||
                products?.price_range?.minimum_price?.regular_price?.value
              }
            />
            {products?.price_range?.minimum_price?.regular_price?.value !== products?.price_range?.minimum_price?.final_price?.value ?
              <del className="text-slate-400 pl-3">
                <Price amount={products?.price_range?.minimum_price?.regular_price?.value} />
              </del> : ''}
          </p>

          <div className="font-medium text-amber-400 list-none cursor-pointer">
            <RatingComponent value={products?.rating_summary || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
