import { useRouter } from "next/navigation"
import { getProductsPrice, ratingCountShow } from "@/components/Util/commonFunctions"
import dynamic from "next/dynamic";
const HoverAddToCartButton = dynamic(() => import('@/components/Util/Button/HoverAddToCartButton'), { ssr: false });
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });

export default function CardEight({ products }) {
    const router=useRouter()
    return (


        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <div onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}>
                <img className="w-full rounded-t-lg" src={products?.image?.url} alt="product image" />
            </div>
            <div className="px-5 pb-5">
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}>{products?.name}</h5>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                    <RatingComponent value={products?.rating_summary || 0} />
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{ratingCountShow(products?.rating_summary)} </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                       {getProductsPrice({products})}

                    </span>
                    <HoverAddToCartButton products={products} className="text-white !bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-blue-800" />
                </div>
            </div>
        </div>

    )
}