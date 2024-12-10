import { openPopover } from "@/lib/redux/slices/popOverSlice";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../Rating/Rating";
import { addProductToWishlist } from "@/lib/redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchCart, initCart } from "@/lib/redux/slices/cartSlice";
import { createDynamicData } from "@/components/Util/commonGraphQuery";
import { ADD_PRODUCTS_TO_CART } from "@/lib/graphql/queries/shoppingCart";
import { useTranslations } from "next-intl";
import { getProductsPrice, truncateTitle } from "@/components/Util/commonFunctions";
import Image from "next/image";
import { startLoading, stopLoading } from "@/lib/redux/slices/loadingSlice";
import { QuikViewSvg, WishlistSvg } from "@/components/SvgFiles/SvgFile";

const CardThree = React.memo(({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { cart_id } = useSelector((state) => state.customer);
    const wishlistId = useSelector((state) => state.customerData?.data?.customer?.wishlists?.[0]?.id);
    const t = useTranslations("ProductCard");

    const openProductPopover = useCallback(() => {
        dispatch(openPopover(product));
    }, [dispatch, product]);

    const addWishlist = useCallback(() => {
        if (wishlistId) {
            dispatch(addProductToWishlist({ wishlistId, sku: product?.sku, quantity: 1 }));
            toast.success(t("WishlistSuccess"));
        } else {
            toast.error(t("WishlistError"));
        }
    }, [dispatch, product, wishlistId, t]);

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        dispatch(startLoading());
        const data = {
            cartId: cart_id,
            sku: product.sku,
            quantity: 1,
        };
        const response = await createDynamicData(ADD_PRODUCTS_TO_CART, data);

        if (product.__typename !== "SimpleProduct") {
            router.push(`/${product.url_key}`);
        } else if (response?.message) {
            localStorage.removeItem("cart_id");
            dispatch(initCart());
        } else if (response) {
            dispatch(fetchCart(cart_id));
            toast.success(`${truncateTitle(product.name)} ${t("AddToCartSuccess")}`);
        } else if (!localStorage.getItem("cart_id")) {
            dispatch(initCart());
        }
        dispatch(stopLoading());
        setIsAddingToCart(false);
    };

    const handleProductClick = useCallback(() => {
        router.push(`/${product?.url_rewrites?.[0]?.url}`);
    }, [router, product]);

    return (
        <div className="border rounded-xl cursor-pointer p-4 bg-white shadow-lg group relative">
            <div>
                <Image
                    src={product?.image?.url}
                    alt={product?.name || "Product Image"}
                    className="h-48 w-full object-cover cursor-pointer rounded-md transition-all duration-300 ease-in-out group-hover:scale-95"
                    onClick={handleProductClick}
                    layout="fixed"
                    width={300}
                    height={300}
                    loading="lazy"
                    // priority={true} 
                />
            </div>

            <div className="inset-0 hover:z-10 gap-3 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                
                <div onClick={addWishlist} className=" bg-white text-gray text-base hover:text-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] border rounded-[10px] p-2 cursor-pointer">

                <WishlistSvg/>
                </div>
              
                <div className=" bg-white text-gray text-base hover:text-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] border rounded-[10px] p-2 cursor-pointer"
                    onClick={openProductPopover}>
                    <QuikViewSvg/>
                </div>
               

                <div  className=" bg-white text-gray text-base hover:text-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] border rounded-[10px] p-2 cursor-pointer"
                    onClick={handleAddToCart}
                    aria-label="Add to cart"
                    disabled={isAddingToCart}>
                <svg width="29px" height="29px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500" onClick={handleProductClick}>{product.sku}</p>
                <div className="flex justify-center">
                    <RatingComponent value={product?.rating_summary || 0} />
                </div>
            </div>

            <div className="mt-4 text-left">
                <span
                    className="text-base text-gray-500 text-left"
                    onClick={handleProductClick}
                >  
                {truncateTitle(product.name)}
                </span>
                <div className="flex justify-between items-center mt-2 space-x-2">
                    {getProductsPrice({ product })}
                </div>
            </div>
        </div>
    );
});

export default CardThree;
