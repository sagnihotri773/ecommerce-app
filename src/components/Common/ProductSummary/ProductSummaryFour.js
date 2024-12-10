
import dynamic from "next/dynamic";
import RatingComponent from "../Rating/Rating";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});


export default function ProductSummaryFour({ data, price = 0, stockStatus = "" }) {
  return (
    <>
      {/* {data?.name ?  */}
      <h1 className="text-xl">{data.name}</h1>
       {/* :
      <div className="h-6 w-full bg-gray-300 rounded  animate-pulse"></div>} */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline space-x-2">
          <span className="text-2sxl font-bold text-gray-900 ">
            {/* {price ? */}
             <Price amount={price} />
              {/* :
            <div className="h-6 w-36 bg-gray-300 rounded  animate-pulse"></div>} */}
          </span>
          {data?.price_range?.minimum_price?.regular_price?.value !==
            data?.price_range?.minimum_price?.final_price?.value ? (
            <del className="text-black text-3xl font-medium">
              <Price
                amount={
                  data?.price_range?.minimum_price?.regular_price?.value
                }
              />
            </del>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center space-x-2 bg-accent text-white pl-4 py-2 rounded-md">
          <span className="text-sm font-medium">
            <RatingComponent value={data?.rating_summary} />
          </span>
        </div>
      </div>
    </>
  );
}
