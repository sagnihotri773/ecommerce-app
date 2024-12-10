import { getProductsPrice, truncateTitle } from "@/components/Util/commonFunctions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardFour({ products }) {
    const router = useRouter()
    return (
        <div className="h-full relative inline-block h-full w-full cursor-pointer">
            <div className="group  flex h-full  items-center  justify-center overflow-hidden rounded-lg border bg-white hover:border-primary dark:bg-black relative  dark:border-primary">
                <Image
                    src={products?.image?.url}
                    className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    loading="lazy"
                    alt="Product Image"
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
                    width={500}
                    height={500}
                />
            </div>
            <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4  z-10 mt-6">
                <div className="flex items-center rounded-full border bg-white p-1 text-xs font-semibold text-black  ">
                    <h3
                        className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight"
                        onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}
                    >
                         {truncateTitle(products.name)}
                    </h3>
                    <p className="flex-none rounded-full bg-primary p-2 text-white">
                        {getProductsPrice({ products })}
                    </p>
                </div>
            </div>
        </div>
    );
};
