'use client'
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWishlist } from '@/lib/redux/slices/wishlistSlice';
import { WishlistSvg } from '@/components/SvgFiles/SvgFile';

export default function HoverAddToWishlistV3({ products }) {
    const t = useTranslations("ProductCard");
    const dispatch = useDispatch();
    const { data: customerData } = useSelector((state) => state.customerData);
    const wishlistId = customerData?.customer?.wishlists[0].id;

    const addWishlist = () => {

        dispatch(addProductToWishlist({ wishlistId, sku: products?.sku, quantity: 1 }))

    };


    return (

        <button
            className="w-14 h-14 flex items-center  justify-center border-[2px] border-black border-solid  transition-colors"
            aria-label="Add to wishlist"
            onClick={() => addWishlist()}
        >
            <WishlistSvg/>
        </button>

    )
}
